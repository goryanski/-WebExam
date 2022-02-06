using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.Dto;
using PhotoMania.Business.PaginationModels;
using PhotoMania.Business.Services.Interfaces;
using PhotoMania.DB.Entities;
using PhotoMania.DB.Repositories.Interfaces;

namespace PhotoMania.Business.Services
{
    public class PostsService : IPostsService
    {
        private IUnitOfWork uow;
        private Automapper.ObjectMapper objectMapper = Automapper.ObjectMapper.Instance;

        public PostsService(IUnitOfWork uow)
        {
            this.uow = uow;
        }


        public async Task<List<PostDto>> GetAllPosts(PostParameters postParameters)
        {
            var postEntities = uow.PostsRepository.GetHomePagePosts(postParameters.PageNumber, postParameters.PageSize);
            return await ConvertPosts(postEntities.ToList());
        }

        public async Task<List<PostDto>> GetUserPosts(PostParameters postParameters, int userId)
        {
            List<Post> selectedPosts = (await uow.PostsRepository.GetAllAsync(p => p.UserId == userId))
                .OrderByDescending(on => on.Date) // latest posts
                .Skip((postParameters.PageNumber - 1) * postParameters.PageSize)
                .Take(postParameters.PageSize)
                .ToList();

            return await ConvertPosts(selectedPosts);
        }
        private async Task<List<PostDto>> ConvertPosts(List<Post> postEntities)
        {
            // try to map all filds that possible
            var postsList = objectMapper.Mapper.Map<List<PostDto>>(postEntities);
            // make list to get some fields, that lost while mapping
            var postEntitiesList = postEntities.ToList();
            // 3 filds we have to map manually
            for (int i = 0; i < postEntities.Count(); i++)
            {
                postsList[i].CommentsCount = await uow.CommentsRepository.GetCountAsync(postEntitiesList[i].Id);
                postsList[i].Username = await uow.UsersRepository.GetUsername(postEntitiesList[i].UserId);
                postsList[i].PhotoPath = await uow.PhotosRepository.GetPath(postEntitiesList[i].Id);
            }
            return postsList;
        }
    }
}
