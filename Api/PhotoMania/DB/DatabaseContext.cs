using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PhotoMania.DB.Entities;
using PhotoMania.DB.Entities.Comments;

namespace PhotoMania.DB
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Avatar> Avatars { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<UserProfile> Users { get; set; }
        public DbSet<FavouritePost> FavouritePosts { get; set; }
        public DbSet<HatedPost> HatedPosts { get; set; }
        public DbSet<LikedCommentReply> LikedCommentReplies { get; set; }
        public DbSet<LikedComment> LikedComments { get; set; }
        public DbSet<CommentReply> CommentReplies { get; set; }
        

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
            //Database.EnsureDeleted();
            //Database.EnsureCreated();
        }
    }
}
