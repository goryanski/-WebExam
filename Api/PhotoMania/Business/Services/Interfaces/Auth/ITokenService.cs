using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Business.Services.Interfaces.Auth
{
    public interface ITokenService
    {
        string CreateToken(string login, string role);
    }
}
