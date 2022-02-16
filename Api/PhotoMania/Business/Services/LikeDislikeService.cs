using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.Services.Interfaces;
using PhotoMania.DB.Entities;
using PhotoMania.DB.Entities.Comments;
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

        public async Task<string> SetLikeToComment(int commentId, int userId)
        {
            if (await CommentHasBeenLiked(commentId, userId))
            {
                return "This comment has been already liked";
            }

            LikedComment likedComment = new LikedComment
            {
                CommentId = commentId,
                UserId = userId,
            };
            await uow.LikedCommentsRepository.CreateAsync(likedComment);

            Comment comment = await uow.CommentsRepository.GetAsync(commentId);
            comment.LikesCount++;
            await uow.CommentsRepository.UpdateAsync(comment);

            return "ok";
        }

        private async Task<bool> CommentHasBeenLiked(int commentId, int userId)
        {
            LikedComment comment = (await uow.LikedCommentsRepository.GetAllAsync(
                fp => fp.CommentId == commentId && fp.UserId == userId
                )).FirstOrDefault();
            return comment != null;
        }

        public async Task<string> SetLikeToReply(int replyId, int userId)
        {
            if (await ReplyHasBeenLiked(replyId, userId))
            {
                return "This post has been already liked";
            }

            LikedCommentReply likedReply = new LikedCommentReply
            {
                CommentReplyId = replyId,
                UserId = userId
            };
            await uow.LikedCommentRepliesRepository.CreateAsync(likedReply);

            CommentReply reply = await uow.CommentRepliesRepository.GetAsync(replyId);
            reply.LikesCount++;
            await uow.CommentRepliesRepository.UpdateAsync(reply);

            return "ok";
        }

        private async Task<bool> ReplyHasBeenLiked(int replyId, int userId)
        {
            LikedCommentReply reply = (await uow.LikedCommentRepliesRepository.GetAllAsync(
               fp => fp.CommentReplyId == replyId && fp.UserId == userId
               )).FirstOrDefault();
            return reply != null;
        }
    }
}
