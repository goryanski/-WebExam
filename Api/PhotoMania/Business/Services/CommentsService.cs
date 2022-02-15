using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.Dto;
using PhotoMania.Business.PaginationModels;
using PhotoMania.Business.Services.Interfaces;
using PhotoMania.DB.Entities.Comments;
using PhotoMania.DB.Repositories.Interfaces;

namespace PhotoMania.Business.Services
{
    public class CommentsService: ICommentsService
    {
        private IUnitOfWork uow;
        private Automapper.ObjectMapper objectMapper = Automapper.ObjectMapper.Instance;
        ICommonService commonService;
        private IValidationService validationService;

        public CommentsService(IUnitOfWork uow, ICommonService commonService, IValidationService validationService)
        {
            this.uow = uow;
            this.commonService = commonService;
            this.validationService = validationService;
        }

        public async Task<string> AddComment(string text, int postId, int userId)
        {
            string errorInfo = validationService.CommentValidationError(text);
            if(errorInfo == "")
            {
                Comment comment = new Comment
                {
                    Text = text,
                    Date = DateTime.Now,
                    PostId = postId,
                    LikesCount = 0,
                    OwnerId = userId,
                    OwnerName = await uow.UsersRepository.GetUsername(userId)
                };
                await uow.CommentsRepository.CreateAsync(comment);
                return "ok";
            }
            return errorInfo;
        }


        public async Task<List<CommentDto>> GetPostComments(PaginationParameters commentsParameters, int postId)
        {
            List<Comment> selectedComments = (await uow.CommentsRepository.GetAllAsync(c => c.PostId == postId))
               .OrderBy(on => on.Date)
               .Skip((commentsParameters.PageNumber - 1) * commentsParameters.PageSize)
               .Take(commentsParameters.PageSize)
               .ToList();

            return await ConvertComments(selectedComments);
        }

        private async Task<List<CommentDto>> ConvertComments(List<Comment> selectedComments)
        {
            List<CommentDto> commentsDto = objectMapper.Mapper.Map<List<CommentDto>>(selectedComments);
            // now we have all we need, except replies count and date in a particular format, so get it
            for (int i = 0; i < commentsDto.Count(); i++)
            {
                commentsDto[i].RepliesCount = await uow.CommentRepliesRepository.GetCommentRepliesCount(selectedComments[i].Id);
                commentsDto[i].Date = commonService.ConvertDateToTimeAgo(selectedComments[i].Date);
            }
            return commentsDto;
        }

        public async Task<List<CommentReplyDto>> GetCommentReplies(PaginationParameters repliesParameters, int commentId)
        {
            List<CommentReply> selectedReplies = (await uow.CommentRepliesRepository.GetAllAsync(r => r.CommentId == commentId))
               .OrderBy(on => on.Date)
               .Skip((repliesParameters.PageNumber - 1) * repliesParameters.PageSize)
               .Take(repliesParameters.PageSize)
               .ToList();

            return ConvertCommentReplies(selectedReplies);
        }

        private List<CommentReplyDto> ConvertCommentReplies(List<CommentReply> selectedReplies)
        {
            List<CommentReplyDto> repliesDto = objectMapper.Mapper.Map<List<CommentReplyDto>>(selectedReplies);
            for (int i = 0; i < repliesDto.Count(); i++)
            {
                repliesDto[i].Date = commonService.ConvertDateToTimeAgo(selectedReplies[i].Date);
            }
            return repliesDto;
        }

        public async Task<string> AddReplyToComment(string text, int commentId, int ownerId, string whomName)
        {
            string errorInfo = validationService.CommentValidationError(text);
            if (errorInfo == "")
            {
                CommentReply commentReply = new CommentReply
                {
                    Text = text,
                    Date = DateTime.Now,
                    LikesCount = 0,
                    OwnerId = ownerId,
                    OwnerName = await uow.UsersRepository.GetUsername(ownerId),
                    CommentId = commentId,
                    WhomName = whomName,
                    WhomId = await uow.UsersRepository.GetUserIdByName(whomName)
                };
                await uow.CommentRepliesRepository.CreateAsync(commentReply);
                return "ok";
            }
            return errorInfo;
        }
    }
}
