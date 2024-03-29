﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoMania.Business.Dto;
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
            return await userDataService.GetUserProfileData(id);
        }

        [HttpGet("getId")]
        public async Task<int> GetUserIdByName([FromQuery] string username)
        {
            return await userDataService.GetUserIdByName(username);
        }

        [HttpGet("data")]
        public async Task<UserDto> GetGeneralUserData([FromQuery] int userId)
        {
            return await userDataService.GetGeneralUserData(userId);
        }
    }
}
