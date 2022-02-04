using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.ExtraModels;

namespace PhotoMania.Business.Services.Interfaces
{
    public interface IUserDataService
    {
        Task<UserProfileDataResponse> GetUserProfileData(int userId);
    }
}
