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
using PhotoMania.Models.ViewModels;

namespace PhotoMania.Controllers
{
    [Route("api/photoMania/[controller]")]
    [ApiController]
    [Authorize]
    public class PostsController : ControllerBase
    {
        IPostsService postsService;
        ILikeDislikeService likeDislikeService;

        public PostsController(IPostsService postsService, ILikeDislikeService likeDislikeService)
        {
            this.postsService = postsService;
            this.likeDislikeService = likeDislikeService;
        }

        [HttpGet]
        public async Task<List<PostDto>> GetPostsBySearchKey([FromQuery] PaginationParameters postParameters, string searchKey)
        {
            return await postsService.GetPostsBySearchKey(postParameters, searchKey);
        }

        [HttpPost("setLike")]
        public async Task<ApiResponse> SetLikeToPost([FromBody] LikeDislikePostViewModel model)
        {
            return new ApiResponse
            {
                Response = await likeDislikeService.SetLikeToPost(model.PostId, model.UserId)
            };
        }

        [HttpPost("setDislike")]
        public async Task<ApiResponse> SetDislikeToPost([FromBody] LikeDislikePostViewModel model)
        {
            return new ApiResponse
            {
                Response = await likeDislikeService.SetDislikeToPost(model.PostId, model.UserId)
            };
        }

        [HttpPost("create")]
        public async Task<ApiResponse> CreatePost([FromBody] PostViewModel model)
        {
            return new ApiResponse
            {
                Response = await postsService.CreatePost(model.Description, model.DbPath, model.UserId)
            };
        }

        [HttpGet("getPost")]
        public async Task<PostDto> GetPostById([FromQuery] int id)
        {
            return await postsService.GetPostById(id);
        }
    }
}
