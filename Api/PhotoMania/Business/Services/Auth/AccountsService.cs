using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.Exceptions;
using PhotoMania.Business.ExtraModels;
using PhotoMania.Business.Services.Interfaces;
using PhotoMania.Business.Services.Interfaces.Auth;
using PhotoMania.DB.Entities;
using PhotoMania.DB.Repositories.Interfaces;
using PhotoMania.Models.ViewModels;

namespace PhotoMania.Business.Services.Auth
{
    public class AccountsService: IAccountsService
    {
        private ITokenService tokenService;
        private IUnitOfWork uow;
        private IValidationService validationService;
        public AccountsService(
            ITokenService tokenService, 
            IUnitOfWork uow,
            IValidationService validationService)
        {
            this.tokenService = tokenService;
            this.uow = uow;
            this.validationService = validationService;
        }
        public async Task<LoginUserResponse> GetAccessToken(string login, string password)
        {
            ;
            Account account = null;
            if (validationService.LoginValidationError(login) == "")
            {
                account = (await uow.AccountsRepository
                .GetAllAsync(u => u.Login.Equals(login)))
                .FirstOrDefault();
            }
            ;
            if (account is null)
            {
                throw new UserNotFoundException();
            }
            // password comes as unencrypted, so we have to encrypt it to compare with password in DB (there all passwords are encrypted)
            string res = validationService.PasswordValidationError(password);
            if (validationService.PasswordValidationError(password) != ""
                || !account.Password.Equals(uow.AccountsRepository.HashPassword(password)))
            {
                throw new IncorrectUserPasswordException();
            }
            
            // get account role
            string role = (await uow.RolesRepository.GetAsync(account.RoleId)).Name;

            return new LoginUserResponse
            {
                AccessToken = tokenService.CreateToken(account.Login, role),
                UserRole = role
            };
        }

        public async Task<string> RegisterNewUser(RegisterViewModel model)
        {
            // validation
            string validationResponse = ModelValidation(model);       
            if (validationResponse == "valid")
            {
                // separating into different entities and wright data to db
                Account account = new Account
                {
                    Login = model.Login,
                    Password = uow.AccountsRepository.HashPassword(model.Password),
                    RoleId = 3 // user
                };
                await uow.AccountsRepository.CreateAsync(account);

                UserProfile profile = new UserProfile
                {
                    AccountId = account.Id,
                    Email = model.Email,
                    Description = model.Description,
                    IsBlocked = false,
                    Rating = 0,
                    RegistrationDate = DateTime.Now,
                };
                await uow.UsersRepository.CreateAsync(profile);

                Avatar avatar = new Avatar
                {
                    Url = model.AvatarPath,
                    UserId = profile.Id
                };
                await uow.AvatarsRepository.CreateAsync(avatar);
            }
            return validationResponse;
        }

        private string ModelValidation(RegisterViewModel model)
        {
            string response = ""; 
            response += validationService.LoginValidationError(model.Login);
            response += validationService.PasswordValidationError(model.Password);
            response += validationService.EmailValidationError(model.Email);
            response += validationService.DescriptionValidationError(model.Description);
            return response == "" ? "valid" : response;
        }
    }
}
