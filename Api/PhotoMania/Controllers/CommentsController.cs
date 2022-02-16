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
        ILikeDislikeService likeService;
        public CommentsController(ICommentsService commentsService, ILikeDislikeService likeService)
        {
            this.commentsService = commentsService;
            this.likeService = likeService;
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

        [HttpGet("getCommentReplies")]
        public async Task<List<CommentReplyDto>> GetCommentReplies([FromQuery] PaginationParameters repliesParameters, int commentId)
        {
            return await commentsService.GetCommentReplies(repliesParameters, commentId);
        }

        [HttpPost("addReply")]
        public async Task<ApiResponse> AddReplyToComment([FromBody] CommentReplyViewModel model)
        {
            return new ApiResponse
            {
                Response = await commentsService.AddReplyToComment(model.Text, model.CommentId, model.OwnerId, model.WhomName)
            };
        }

        [HttpPost("setLikeToComment")]
        public async Task<ApiResponse> SetLikeToComment([FromBody] LikeCommentViewModel model)
        {
            return new ApiResponse
            {
                Response = await likeService.SetLikeToComment(model.CommentId, model.UserId)
            };
        }

        [HttpPost("setLikeToReply")]
        public async Task<ApiResponse> SetLikeToReply([FromBody] LikeReplyViewModel model)
        {
            return new ApiResponse
            {
                Response = await likeService.SetLikeToReply(model.ReplyId, model.UserId)
            };
        }
    }
}
