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
    public class PostsController : ControllerBase
    {
        IPostsService postsService;

        public PostsController(IPostsService postsService)
        {
            this.postsService = postsService;
        }

        [HttpGet]
        public async Task<List<PostDto>> GetPostsBySearchKey([FromQuery] PostParameters postParameters, string searchKey)
        {
            return await postsService.GetPostsBySearchKey(postParameters, searchKey);
        }
    }
}
