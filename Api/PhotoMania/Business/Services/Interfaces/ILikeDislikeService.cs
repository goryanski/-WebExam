using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.Dto;
using PhotoMania.Business.PaginationModels;

namespace PhotoMania.Business.Services.Interfaces
{
    public interface ILikeDislikeService
    {
        Task<string> SetLikeToPost(int postId, int userId);
        Task<string> SetDislikeToPost(int postId, int userId);
        Task<string> SetLikeToComment(int commentId, int userId);
        Task<string> SetLikeToReply(int replyId, int userId);
    }
}
