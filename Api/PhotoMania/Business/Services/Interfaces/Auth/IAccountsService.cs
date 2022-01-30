using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.ExtraModels;

namespace PhotoMania.Business.Services.Interfaces.Auth
{
    public interface IAccountsService
    {
        Task<LoginUserResponse> GetAccessToken(string login, string password);
    }
}
