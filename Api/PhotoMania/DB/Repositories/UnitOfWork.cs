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
        SocialLinksRepository _socialLinksRepository;
        UsersRepository _usersRepository;
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
        public SocialLinksRepository SocialLinksRepository =>
            _socialLinksRepository ?? (_socialLinksRepository = new SocialLinksRepository(db));
        public UsersRepository UsersRepository =>
          _usersRepository ?? (_usersRepository = new UsersRepository(db));



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
                Login = "admin",
                Password = "admin",
                RoleId = role1.Id
            };
            Account account2 = new Account
            {
                Login = "moderator",
                Password = "moderator",
                RoleId = role2.Id
            };
            Account account3 = new Account
            {
                Login = "user",
                Password = "user",
                RoleId = role3.Id
            };
            db.Accounts.Add(account1);
            db.Accounts.Add(account2);
            db.Accounts.Add(account3);
            db.SaveChanges();


            UserProfile user1 = new UserProfile
            {
                AccountId = account3.Id,
                Email = "user1@gmail.com",
                Description = "I'm 27. I like volleyball and walking in the woods",
                IsBlocked = false,
                Rating = 0,
                RegistrationDate = DateTime.Now,
            };
            db.Users.Add(user1);
            db.SaveChanges();
            #endregion


            #region Posts
            Post post1 = new Post
            {
                Description = "my first post",
                Date = DateTime.Now,
                LikesCount = 0,
                DislikesCount = 0,
                UserId = user1.Id
            };
            db.Posts.Add(post1);
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
                Name = "avatar",
                Url = "Uploads\\avatars\\avatar.jpg",
                UserId = user1.Id
            };
            db.Avatars.Add(avatar1);

            SocialLink socialLink1 = new SocialLink
            {
                Link = "https://t.me/igorok_208",
                UserId = user1.Id
            };
            db.SocialLinks.Add(socialLink1);

            Photo photo1 = new Photo
            {
                Name = "fall.jpeg",
                Url = "Uploads\\images\\fall.jpeg",
                PostId = user1.Id
            };
            db.Photos.Add(photo1);
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
