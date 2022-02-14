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
    public class CommentsController : ControllerBase
    {
        ICommentsService commentsService;
        public CommentsController(ICommentsService commentsService)
        {
            this.commentsService = commentsService;
        }


        [HttpGet("getComments")]
        public async Task<List<CommentDto>> GetPostComments([FromQuery] PaginationParameters commentsParameters, int postId)
        {
            return await commentsService.GetPostComments(commentsParameters, postId);
        }

        [HttpPost("add")]
        public async Task<ApiResponse> AddComment([FromBody] CommentViewModel model)
        {
            return new ApiResponse
            {
                Response = await commentsService.AddComment(model.Text, model.PostId, model.UserId)
            };
        }
    }
}
