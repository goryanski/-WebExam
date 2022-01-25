using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Business.Services.Interfaces.Auth
{
    public interface IAccountsService
    {
        Task<string> GetAccessToken(string login, string password);
    }
}
