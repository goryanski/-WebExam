using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.Dto;
using PhotoMania.Business.ExtraModels;
using PhotoMania.Business.Services.Interfaces;
using PhotoMania.DB.Entities;
using PhotoMania.DB.Repositories.Interfaces;

namespace PhotoMania.Business.Services
{
    public class UserDataService : IUserDataService
    {
        private IUnitOfWork uow;
        private IValidationService validationService;
        private Automapper.ObjectMapper objectMapper = Automapper.ObjectMapper.Instance;

        public UserDataService(IUnitOfWork uow, IValidationService validationService)
        {
            this.uow = uow;
            this.validationService = validationService;
        }

        public async Task<int> GetUserIdByName(string username)
        {
            int userId = -1;
            if (validationService.IsHeaderSearchFieldValid(username))
            {
                Account account = (await uow.AccountsRepository.GetAllAsync(a => a.Login == username)).FirstOrDefault();
                if (account != null)
                {
                    userId = await uow.UsersRepository.GetUserId(account.Id);
                }
            }
            return userId;
        }

        public async Task<UserProfileDataResponse> GetUserProfileData(int userId)
        {
            var userEntity = await uow.UsersRepository.GetAsync(userId);
            // map all we can
            UserProfileDataResponse response = objectMapper.Mapper.Map<UserProfileDataResponse> (userEntity);
            // get fields that can't mapping
            response.Username = await uow.AccountsRepository.GetLogin(userEntity.AccountId);
            response.Avatar = await uow.AvatarsRepository.GetAvatarPath(userId);
            response.PostsCount = await uow.PostsRepository.GetPostsCount(userId);
            response.Rating = await CalculateRating(userId);
            // get only date without time
            string date = response.RegistrationDate;
            response.RegistrationDate = date.Substring(0, date.LastIndexOf(" "));

            return response;
        }

        private async Task<int> CalculateRating(int userId)
        {
            // rating = all_posts_likes - all_posts_dislikes
            int rating = 0;
            var posts = await uow.PostsRepository.GetAllAsync(p => p.UserId == userId);
            for (int i = 0; i < posts.Count; i++)
            {
                rating += posts[i].LikesCount - posts[i].DislikesCount;
            }
            // no more than a million
            return rating >= 1000_000 ? 1000_000 : rating;
        }

        public async Task<UserDto> GetGeneralUserData(int userId)
        {
            UserProfile userProfile = await uow.UsersRepository.GetAsync(userId);
            Account account = await uow.AccountsRepository.GetAsync(userProfile.AccountId);

            return new UserDto
            {
                Username = account.Login,
                Password = "", // we won't send password for more security
                Email = userProfile.Email,
                Description = userProfile.Description,
                Avatar = await uow.AvatarsRepository.GetAvatarPath(userId)
            };
        }

        public async Task<string> EditUserPersonalInfo(UserDto user)
        {
            UserProfile userEntity = await uow.UsersRepository.GetAsync(user.Id);
            Account accountEntity = await uow.AccountsRepository.GetAsync(userEntity.AccountId);

            string response = "";
            bool canUpdateAccount = false;
            bool canUpdateProfile = false;


            // if field is not empty - check and update it or take validation error of this field
            if (!user.Username.Equals(""))
            {
                response = await UsernameValidationError(user.Username);
                if(response == "")
                {
                    accountEntity.Login = user.Username;
                    canUpdateAccount = true;
                }
            }
            if(!user.Password.Equals(""))
            {
                string passwordError = validationService.PasswordValidationError(user.Password);
                if(passwordError == "")
                {
                    accountEntity.Password = user.Password;
                    canUpdateAccount = true;
                }
                else
                {
                    response += passwordError;
                }
            }
            if (!user.Email.Equals(""))
            {
                string emailError = validationService.EmailValidationError(user.Email);
                if (emailError == "")
                {
                    userEntity.Email = user.Email;
                    canUpdateProfile = true;
                }
                else
                {
                    response += emailError;
                }
            }
            if (!user.Description.Equals(""))
            {
                string descriptionError = validationService.DescriptionValidationError(user.Description);
                if (descriptionError == "")
                {
                    userEntity.Description = user.Description;
                    canUpdateProfile = true;
                }
                else
                {
                    response += descriptionError;
                }
            }

            // if all fields above are valid
            if(response == "")
            {
                // check avatar
                if (!user.Avatar.Equals(""))
                {
                    Avatar avatar = await uow.AvatarsRepository.GetAvatarByUserId(user.Id);
                    RemoveOldAvatar(avatar.Url);
                    avatar.Url = user.Avatar;
                    await uow.AvatarsRepository.UpdateAsync(avatar);
                }

                // and update rest if it makes sense
                if(canUpdateAccount)
                {
                    await uow.AccountsRepository.UpdateAsync(accountEntity);
                }
                if(canUpdateProfile)
                {
                    await uow.UsersRepository.UpdateAsync(userEntity);
                }

                return "ok";
            }
            else
            {
                return response;
            }
        }

        private void RemoveOldAvatar(string url)
        {
            FileInfo file = new FileInfo("StaticFiles\\" + url);
            if (file.Exists)
            {
                file.Delete();
            }
        }

        private async Task<string> UsernameValidationError(string username)
        {
            string response = "";
            response += validationService.LoginValidationError(username);
            if (response == "" && await uow.AccountsRepository.UserAlreadyExists(username))
            {
                response += $"User with login '{username}' already exists.\n";
            }
            return response;
        }
    }
}
