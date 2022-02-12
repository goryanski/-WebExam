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

        public CommentsService(IUnitOfWork uow)
        {
            this.uow = uow;
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
            List<CommentDto> CommentsList = objectMapper.Mapper.Map<List<CommentDto>>(selectedComments);
            // now we have all we need, except replies count, so get it
            foreach (var comment in CommentsList)
            {
                //comment.RepliesCount = 
            }
            ;

            return  new List<CommentDto>();
        }
        //private async Task<List<PostDto>> ConvertPosts(List<Post> postEntities)
        //{
        //    // try to map all filds that possible
        //    var postsList = objectMapper.Mapper.Map<List<PostDto>>(postEntities);
        //    // make list to get some fields, that lost while mapping
        //    var postEntitiesList = postEntities.ToList();
        //    // 3 filds we have to map manually
        //    for (int i = 0; i < postEntities.Count(); i++)
        //    {
        //        postsList[i].CommentsCount = await uow.CommentsRepository.GetCountAsync(postEntitiesList[i].Id);
        //        postsList[i].Username = await uow.UsersRepository.GetUsername(postEntitiesList[i].UserId);
        //        postsList[i].PhotoPath = await uow.PhotosRepository.GetPath(postEntitiesList[i].Id);
        //        postsList[i].Date = ConvertDateToTimeAgo(postEntitiesList[i].Date);
        //    }
        //    return postsList;
        //}
        //public class CommentDto
        //{
        //    public int Id { get; set; }
        //    public string Text { get; set; }
        //    public string Date { get; set; }
        //    public int LikesCount { get; set; }
        //    public int PostId { get; set; }
        //    public int OwnerId { get; set; }
        //    public string OwnerName { get; set; }
        //    public int RepliesCount { get; set; }
        //}
    }
}
