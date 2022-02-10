using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Business.Services.Interfaces
{
    public interface ILikeDislikeService
    {
        Task<string> SetLikeToPost(int postId, int userId);
        Task<string> SetDislikeToPost(int postId, int userId);
    }
}
