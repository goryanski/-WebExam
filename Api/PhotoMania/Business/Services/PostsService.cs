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
        private IValidationService validationService;
        private Automapper.ObjectMapper objectMapper = Automapper.ObjectMapper.Instance;

        public PostsService(IUnitOfWork uow, IValidationService validationService)
        {
            this.uow = uow;
            this.validationService = validationService;
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
                postsList[i].Date = ConvertDateToTimeAgo(postEntitiesList[i].Date);
            }
            return postsList;
        }

        public async Task<string> CreatePost(string description, string dbPath, int userId)
        {
            string error = validationService.PostDescriptionValidationError(description);
            if(error != "")
            {
                return error;
            }
            // create
            Post post = new Post
            {
                Description = description,
                Date = DateTime.Now,
                LikesCount = 0,
                DislikesCount = 0,
                UserId = userId
            };
            await uow.PostsRepository.CreateAsync(post);
            Photo photo = new Photo
            {
                Url = dbPath,
                PostId = post.Id
            };
            await uow.PhotosRepository.CreateAsync(photo);

            return "ok";
        }

        public string ConvertDateToTimeAgo(DateTime dateTime)
        {
            string result = string.Empty;
            var timeSpan = DateTime.Now.Subtract(dateTime);

            if (timeSpan <= TimeSpan.FromSeconds(60))
            {
                result = string.Format("{0} seconds ago", timeSpan.Seconds);
            }
            else if (timeSpan <= TimeSpan.FromMinutes(60))
            {
                result = timeSpan.Minutes > 1 ?
                    String.Format("{0} minutes ago", timeSpan.Minutes) :
                    "a minute ago";
            }
            else if (timeSpan <= TimeSpan.FromHours(24))
            {
                result = timeSpan.Hours > 1 ?
                    String.Format("{0} hours ago", timeSpan.Hours) :
                    "an hour ago";
            }
            else if (timeSpan <= TimeSpan.FromDays(30))
            {
                result = timeSpan.Days > 1 ?
                    String.Format("{0} days ago", timeSpan.Days) :
                    "yesterday";
            }
            else if (timeSpan <= TimeSpan.FromDays(365))
            {
                result = timeSpan.Days > 30 ?
                    String.Format("{0} months ago", timeSpan.Days / 30) :
                    "a month ago";
            }
            else
            {
                result = timeSpan.Days > 365 ?
                    String.Format("{0} years ago", timeSpan.Days / 365) :
                    "a year ago";
            }

            return result;
        }

        public async Task<PostDto> GetPostById(int id)
        {
            Post post = await uow.PostsRepository.GetAsync(id);
            PostDto postDto = objectMapper.Mapper.Map<PostDto>(post);
            postDto.CommentsCount = await uow.CommentsRepository.GetCountAsync(post.Id);
            postDto.Username = await uow.UsersRepository.GetUsername(post.UserId);
            postDto.PhotoPath = await uow.PhotosRepository.GetPath(post.Id);
            postDto.Date = ConvertDateToTimeAgo(post.Date);
            return postDto;
        }
    }
}
