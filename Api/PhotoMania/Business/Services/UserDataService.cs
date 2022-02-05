using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.ExtraModels;
using PhotoMania.Business.Services.Interfaces;
using PhotoMania.DB.Repositories.Interfaces;

namespace PhotoMania.Business.Services
{
    public class UserDataService : IUserDataService
    {
        private IUnitOfWork uow;
        private Automapper.ObjectMapper objectMapper = Automapper.ObjectMapper.Instance;

        public UserDataService(IUnitOfWork uow)
        {
            this.uow = uow;
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
    }
}
