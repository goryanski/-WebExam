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

        public async Task<List<PostDto>> GetPostsBySearchKey(PostParameters postParameters, string searchKey)
        {
            List<Post> selectedPosts = (await uow.PostsRepository.GetAllAsync(p => p.Description.Contains(searchKey)))
                .OrderByDescending(on => on.Date)
                .Skip((postParameters.PageNumber - 1) * postParameters.PageSize)
                .Take(postParameters.PageSize)
                .ToList();

            return await ConvertPosts(selectedPosts);
        }

        public async Task<List<PostDto>> GetUserPosts(PostParameters postParameters, int userId)
        {
            List<Post> selectedPosts = (await uow.PostsRepository.GetAllAsync(p => p.UserId == userId))
                .OrderByDescending(on => on.Date)
                .Skip((postParameters.PageNumber - 1) * postParameters.PageSize)
                .Take(postParameters.PageSize)
                .ToList();

            return await ConvertPosts(selectedPosts);
        }

        public async Task<List<PostDto>> GetUserFavouritesPosts(PostParameters postParameters, int userId)
        {
            // first get latest user favourite posts 
            List<FavouritePost> favouritePosts = (await uow.FavouritePostsRepository.GetAllAsync(fp => fp.UserId == userId))
                .OrderByDescending(on => on.Date)
                .Skip((postParameters.PageNumber - 1) * postParameters.PageSize)
                .Take(postParameters.PageSize)
                .ToList();

            // then take their ids
            List<int> FavouritesPostsIds = new List<int>();
            foreach (var post in favouritePosts)
            {
                FavouritesPostsIds.Add(post.PostId);
            }

            // then find posts entities by these ids one by one
            List<Post> selectedPosts = new List<Post>();
            foreach (var id in FavouritesPostsIds)
            {
                selectedPosts.Add(await uow.PostsRepository.GetAsync(id));
            }

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
