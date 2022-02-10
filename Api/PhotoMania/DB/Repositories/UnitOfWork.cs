using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.DB.Entities;
using PhotoMania.DB.Repositories.Interfaces;

namespace PhotoMania.DB.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        DatabaseContext db;
        AccountsRepository _accountsRepository;
        AvatarsRepository _avatarsRepository;
        CommentsRepository _commentsRepository;
        PhotosRepository _photosRepository;
        PostsRepository _postsRepository;
        RolesRepository _rolesRepository;
        UsersRepository _usersRepository;
        FavouritePostsRepository _favouritePostsRepository;
        HatedPostsRepository _hatedPostsRepository;
        public AccountsRepository AccountsRepository =>
            _accountsRepository ?? (_accountsRepository = new AccountsRepository(db));
        public AvatarsRepository AvatarsRepository =>
            _avatarsRepository ?? (_avatarsRepository = new AvatarsRepository(db));
        public CommentsRepository CommentsRepository =>
          _commentsRepository ?? (_commentsRepository = new CommentsRepository(db));
        public PhotosRepository PhotosRepository =>
            _photosRepository ?? (_photosRepository = new PhotosRepository(db));
        public PostsRepository PostsRepository =>
           _postsRepository ?? (_postsRepository = new PostsRepository(db));
        public RolesRepository RolesRepository =>
             _rolesRepository ?? (_rolesRepository = new RolesRepository(db));
        public UsersRepository UsersRepository =>
          _usersRepository ?? (_usersRepository = new UsersRepository(db));
        public FavouritePostsRepository FavouritePostsRepository =>
         _favouritePostsRepository ?? (_favouritePostsRepository = new FavouritePostsRepository(db));
        public HatedPostsRepository HatedPostsRepository =>
        _hatedPostsRepository ?? (_hatedPostsRepository = new HatedPostsRepository(db));



        public UnitOfWork(DatabaseContext context)
        {
            db = context;
            //DbInit();
        }

        private void DbInit()
        {
            #region Users
            Role role1 = new Role { Name = "admin" };
            Role role2 = new Role { Name = "moderator" };
            Role role3 = new Role { Name = "user" };
            db.Roles.Add(role1);
            db.Roles.Add(role2);
            db.Roles.Add(role3);
            db.SaveChanges();


            Account account1 = new Account
            {
                Login = "admin17",
                Password = AccountsRepository.HashPassword("admin171717"),
                RoleId = role1.Id
            };
            Account account2 = new Account
            {
                Login = "moderator",
                Password = AccountsRepository.HashPassword("moderator1717"),
                RoleId = role2.Id
            };
            Account account3 = new Account
            {
                Login = "vasya",
                Password = AccountsRepository.HashPassword("user12SDSDSD1w"),
                RoleId = role3.Id
            };
            Account account4 = new Account
            {
                Login = "avatar",
                Password = AccountsRepository.HashPassword("user12SDSDSD1w"),
                RoleId = role3.Id
            };
            db.Accounts.Add(account1);
            db.Accounts.Add(account2);
            db.Accounts.Add(account3);
            db.Accounts.Add(account4);
            db.SaveChanges();


            UserProfile user1 = new UserProfile
            {
                AccountId = account3.Id,
                Email = "user1@gmail.com",
                Description = "I'm 27. I like volleyball and walking in the woods",
                IsBlocked = false,
                RegistrationDate = DateTime.Now,
            };
            UserProfile user2 = new UserProfile
            {
                AccountId = account4.Id,
                Email = "user2@gmail.com",
                Description = "I love blue girls",
                IsBlocked = false,
                RegistrationDate = DateTime.Now,
            };
            db.Users.Add(user1);
            db.Users.Add(user2);
            db.SaveChanges();
            #endregion


            #region Posts
            Post post1 = new Post
            {
                Description = "amazing fall",
                Date = DateTime.Now,
                LikesCount = 4,
                DislikesCount = 0,
                UserId = user1.Id
            };
            Post post2 = new Post
            {
                Description = "beautiful spring",
                Date = DateTime.Now.AddDays(-1),
                LikesCount = 10,
                DislikesCount = 2,
                UserId = user1.Id
            };
            Post post3 = new Post
            {
                Description = "just summer",
                Date = DateTime.Now.AddDays(-2),
                LikesCount = 7,
                DislikesCount = 1,
                UserId = user1.Id
            };
            Post post4 = new Post
            {
                Description = "lovely winter",
                Date = DateTime.Now.AddDays(-3),
                LikesCount = 6,
                DislikesCount = 7,
                UserId = user1.Id
            };
            Post post5 = new Post
            {
                Description = "my first post",
                Date = DateTime.Now.AddDays(-4),
                LikesCount = 44,
                DislikesCount = 1,
                UserId = user1.Id
            };
            Post post6 = new Post
            {
                Description = "my dog",
                Date = DateTime.Now.AddDays(-9),
                LikesCount = 550022,
                DislikesCount = 16,
                UserId = user2.Id
            };
            Post post7 = new Post
            {
                Description = "life under water",
                Date = DateTime.Now.AddDays(-11),
                LikesCount = 490099,
                DislikesCount = 9,
                UserId = user2.Id
            };
            db.Posts.Add(post1);
            db.Posts.Add(post2);
            db.Posts.Add(post3);
            db.Posts.Add(post4);
            db.Posts.Add(post5);
            db.Posts.Add(post6);
            db.Posts.Add(post7);
            db.SaveChanges();




            Comment comment1 = new Comment
            {
                Text = "my first comment",
                Date = DateTime.Now,
                PostId = post1.Id,
                //UserId = user1.Id,
            };
            db.Comments.Add(comment1);
            #endregion


            #region UserProfile info
            Avatar avatar1 = new Avatar
            {
                Url = @"avatars\avatar.jpg",
                UserId = user2.Id
            };
            Avatar avatar2 = new Avatar
            {
                Url = @"avatars\vasya_ava.jpg",
                UserId = user1.Id
            };
            db.Avatars.Add(avatar1);
            db.Avatars.Add(avatar2);


            Photo photo1 = new Photo
            {
                Url = @"images\fall.jpeg",
                PostId = post1.Id
            };
            Photo photo2 = new Photo
            {
                Url = @"images\spring.jpg",
                PostId = post2.Id
            };
            Photo photo3 = new Photo
            {
                Url = @"images\summer.jpg",
                PostId = post3.Id
            };
            Photo photo4 = new Photo
            {
                Url = @"images\winter.jpg",
                PostId = post4.Id
            };
            Photo photo5 = new Photo
            {
                Url = @"images\forest.jpg",
                PostId = post5.Id
            };
            Photo photo6 = new Photo
            {
                Url = @"images\my_dog.jpg",
                PostId = post6.Id
            };
            Photo photo7 = new Photo
            {
                Url = @"images\under_water.jpg",
                PostId = post7.Id
            };
            db.Photos.Add(photo1);
            db.Photos.Add(photo2);
            db.Photos.Add(photo3);
            db.Photos.Add(photo4);
            db.Photos.Add(photo5);
            db.Photos.Add(photo6);
            db.Photos.Add(photo7);
            db.SaveChanges();
            #endregion
        }

        private bool disposed = false;
        public virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
                disposed = true;
            }
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
