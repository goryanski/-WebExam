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

namespace PhotoMania.Controllers
{
    [Route("api/photoMania/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        IPostsService postsService;
        public UserProfileController(IPostsService postsService)
        {
            this.postsService = postsService;
        }

        [HttpGet("posts")]
        public async Task<List<PostDto>> GetUserPosts([FromQuery] PostParameters postParameters, int userId)
        {
            return await postsService.GetUserPosts(postParameters, userId);
        }

        [HttpGet("favourites")]
        public async Task<List<PostDto>> GetUserFavouritesPosts([FromQuery] PostParameters postParameters, int userId)
        {
            return await postsService.GetUserFavouritesPosts(postParameters, userId);
        }
    }
}
