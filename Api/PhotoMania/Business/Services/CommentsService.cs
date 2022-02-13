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

        public CommentsService(IUnitOfWork uow, ICommonService commonService)
        {
            this.uow = uow;
            this.commonService = commonService;
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
    }
}
