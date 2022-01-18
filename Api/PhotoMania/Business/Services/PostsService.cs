using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.Dto;
using PhotoMania.Business.Services.Interfaces;
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

        public async Task<List<PostDto>> GetAllPosts()
        {
            var postEntities = await uow.PostsRepository.GetAllAsync();
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
