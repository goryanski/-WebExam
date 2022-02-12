using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoMania.Business.Dto;
using PhotoMania.Business.PaginationModels;
using PhotoMania.Business.Services.Interfaces;
using PhotoMania.Models.Response;

namespace PhotoMania.Controllers
{
    [Route("api/photoMania/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        IPostsService postsService;
        IUserDataService userDataService;
        public UserProfileController(IPostsService postsService, IUserDataService userDataService)
        {
            this.postsService = postsService;
            this.userDataService = userDataService;
        }

        [HttpGet("posts")]
        public async Task<List<PostDto>> GetUserPosts([FromQuery] PaginationParameters postParameters, int userId)
        {
            return await postsService.GetUserPosts(postParameters, userId);
        }

        [HttpGet("favourites")]
        public async Task<List<PostDto>> GetUserFavouritesPosts([FromQuery] PaginationParameters postParameters, int userId)
        {
            return await postsService.GetUserFavouritesPosts(postParameters, userId);
        }

        [HttpPut("update")]
        public async Task<ApiResponse> EditUserPersonalInfo([FromBody] UserDto user)
        {
            return new ApiResponse
            {
                Response = await userDataService.EditUserPersonalInfo(user)
            };
        }

    }
}
