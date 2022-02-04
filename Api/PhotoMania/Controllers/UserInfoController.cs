using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoMania.Business.ExtraModels;
using PhotoMania.Business.Services.Interfaces;
using PhotoMania.Models.Response;

namespace PhotoMania.Controllers
{
    [Route("api/photoMania/[controller]")]
    [ApiController]
    [Authorize]
    public class UserInfoController : ControllerBase
    {
        IUserDataService userDataService;
        public UserInfoController(IUserDataService userDataService)
        {
            this.userDataService = userDataService;
        }

        [HttpGet("profile")]
        public async Task<UserProfileDataResponse> GetUserProfileData([FromQuery] int id)
        {
            // data comes right
            return await userDataService.GetUserProfileData(id);
        }
    }
}
