using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using PhotoMania.Business.Exceptions;
using PhotoMania.Business.ExtraModels;
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
        public AccountsService(ITokenService tokenService, IUnitOfWork uow)
        {
            this.tokenService = tokenService;
            this.uow = uow;
        }
        public async Task<LoginUserResponse> GetAccessToken(string login, string password)
        {
            var account = (await uow.AccountsRepository
                .GetAllAsync(u => u.Login.Equals(login)))
                .FirstOrDefault();
            
            if (account is null)
            {
                throw new UserNotFoundException();
            }
            // password comes as unencrypted, so we have to encrypt it to compare with password in DB (there all passwords are encrypted)
            if (!account.Password.Equals(uow.AccountsRepository.HashPassword(password)))
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

            }
            // separating into Dto objects and entities

            // wright data to db


            return validationResponse;
        }

        private string ModelValidation(RegisterViewModel model)
        {
            // TODO: make separate service for validation (make login and password validation for login method above)
            string response = "valid";
            if (!Regex.IsMatch(model.Login, "^[a-zA-Z_0-9]{4,14}$"))
            {
                response = "Login must be English letters only, digits, symbol _ (4-14 symbols)";
            }
            if (!Regex.IsMatch(model.Password, "^[a-zA-Z_#@0-9]{4,16}$"))
            {
                response = "Password must be English letters only, digits, symbols _ # @ (4-16 symbols)";
            }




            return response;
        }
    }
}
