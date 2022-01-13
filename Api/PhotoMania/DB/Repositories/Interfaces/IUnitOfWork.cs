using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.DB.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        AccountsRepository AccountsRepository { get; }
        AvatarsRepository AvatarsRepository { get; }
        CommentsRepository CommentsRepository { get; }
        PhotosRepository PhotosRepository { get; }
        PostsRepository PostsRepository { get; }
        RolesRepository RolesRepository { get; }
        UsersRepository UsersRepository { get; }
        SocialLinksRepository SocialLinksRepository { get; }

    }
}
