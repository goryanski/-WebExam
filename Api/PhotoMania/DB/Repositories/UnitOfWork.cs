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
        PostsRepository _postsRepository;
        CommentsRepository _commentsRepository;
        UsersRepository _usersRepository;


        public PostsRepository PostsRepository =>
           _postsRepository ?? (_postsRepository = new PostsRepository(db));
        public CommentsRepository CommentsRepository =>
           _commentsRepository ?? (_commentsRepository = new CommentsRepository(db));

        public UsersRepository UsersRepository =>
          _usersRepository ?? (_usersRepository = new UsersRepository(db));

        public UnitOfWork(DatabaseContext context)
        {
            db = context;

            //DbInit();

        }

        private void DbInit()
        {
            //Post post1 = new Post
            //{
            //    PhotoUrl = "Uploads\\fall.jpeg",
            //};
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
