using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace PhotoMania.Utils
{
    public class JwtAuthOptions
    {
        public const string ISSUER = "server";
        public const string AUDIENCE = "client";
        const string KEY = "6214C4B6-2984-4BB7-A2EA-3706246C6CE5";
        public const int LIFETIME_SEC = 60;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
