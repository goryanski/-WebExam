using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.ExtraModels;
using PhotoMania.Models.ViewModels;

namespace PhotoMania.Business.Services.Interfaces.Auth
{
    public interface IAccountsService
    {
        Task<LoginUserResponse> GetAccessToken(string login, string password);
        Task<string> RegisterNewUser(RegisterRequestModel model);
    }
}
