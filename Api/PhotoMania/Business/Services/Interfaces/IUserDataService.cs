using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.Dto;
using PhotoMania.Business.ExtraModels;

namespace PhotoMania.Business.Services.Interfaces
{
    public interface IUserDataService
    {
        Task<UserProfileDataResponse> GetUserProfileData(int userId);
        Task<int> GetUserIdByName(string username);
        Task<UserDto> GetGeneralUserData(int userId);
        Task<string> EditUserPersonalInfo(UserDto user);
    }
}
