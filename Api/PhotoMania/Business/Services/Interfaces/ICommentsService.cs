﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.Dto;
using PhotoMania.Business.PaginationModels;

namespace PhotoMania.Business.Services.Interfaces
{
    public interface ICommentsService
    {
        Task<List<CommentDto>> GetPostComments(PaginationParameters commentsParameters, int postId);
        Task<string> AddComment(string text, int postId, int userId);
        Task<List<CommentReplyDto>> GetCommentReplies(PaginationParameters repliesParameters, int commentId);
    }
}
