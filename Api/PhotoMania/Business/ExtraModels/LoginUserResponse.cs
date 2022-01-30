using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Business.ExtraModels
{
    public class LoginUserResponse
    {
        public string AccessToken { get; set; }
        public string UserRole { get; set; }
    }
}
