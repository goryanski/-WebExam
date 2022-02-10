using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.Services.Interfaces;
using PhotoMania.DB.Entities;
using PhotoMania.DB.Repositories.Interfaces;

namespace PhotoMania.Business.Services
{
    public class LikeDislikeService : ILikeDislikeService
    {
        private IUnitOfWork uow;
        private Automapper.ObjectMapper objectMapper = Automapper.ObjectMapper.Instance;

        public LikeDislikeService(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        public async Task<string> SetLikeToPost(int postId, int userId)
        {
            if (await PostHasBeenLiked(postId, userId))
            {
                return "This post has been already liked";
            }
            // write favouritePost to DB
            FavouritePost favouritePost = new FavouritePost
            {
                PostId = postId,
                UserId = userId,
                Date = DateTime.Now
            };
            await uow.FavouritePostsRepository.CreateAsync(favouritePost);
            
            // set like in post entity
            Post post = await uow.PostsRepository.GetAsync(postId);
            post.LikesCount++;
            await uow.PostsRepository.UpdateAsync(post);
            
            return "ok";
        }

        public async Task<string> SetDislikeToPost(int postId, int userId)
        {
            if (await PostHasBeenDisliked(postId, userId))
            {
                return "This post has been already disliked";
            }
            HatedPost hatedPost = new HatedPost
            {
                PostId = postId,
                UserId = userId
            };
            await uow.HatedPostsRepository.CreateAsync(hatedPost);

            Post post = await uow.PostsRepository.GetAsync(postId);
            post.DislikesCount++;
            await uow.PostsRepository.UpdateAsync(post);

            return "ok";
        }

        private async Task<bool> PostHasBeenLiked(int postId, int userId)
        {
            FavouritePost post = (await uow.FavouritePostsRepository.GetAllAsync(
                fp => fp.PostId == postId && fp.UserId == userId
                )).FirstOrDefault();
            return post != null;
        }
        private async Task<bool> PostHasBeenDisliked(int postId, int userId)
        {
            HatedPost post = (await uow.HatedPostsRepository.GetAllAsync(
                fp => fp.PostId == postId && fp.UserId == userId
                )).FirstOrDefault();
            return post != null;
        }
    }
}
