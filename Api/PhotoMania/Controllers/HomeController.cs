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
using PhotoMania.DB.Entities;
using PhotoMania.DB.Repositories;
using PhotoMania.DB.Repositories.Interfaces;

namespace PhotoMania.Controllers
{
    [Route("api/photoMania/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        IPostsService postsService;

        public HomeController(IPostsService postsService)
        {
            this.postsService = postsService;
        }

        [HttpGet]
        // we use the from query attribute to point out that we'll be using query parameters to define which page and how many posts we are requesting (posts?pageNumber=2&pageSize=2). The PostParameters class is the container for the actual parameters
        public async Task<List<PostDto>> GetPosts([FromQuery] PaginationParameters postParameters)
        {
            return await postsService.GetAllPosts(postParameters);
        }



        // pagination https://forproger.ru/article/paginaciya-v-aspnet-core-web-api
    }
}
