using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Business.ExtraModels
{
    public class UserProfileDataResponse
    {
        public string Username { get; set; }
        public string Avatar { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
        public int PostsCount { get; set; }
        public string RegistrationDate { get; set; }
    }
}
