using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.ExtraModels;
using PhotoMania.Business.Services.Interfaces;

namespace PhotoMania.Business.Services
{
    public class UserDataService : IUserDataService
    {
        public async Task<UserProfileDataResponse> GetUserProfileData(int userId)
        {
            // stop here 
            return  new UserProfileDataResponse();
        }
    }
}
