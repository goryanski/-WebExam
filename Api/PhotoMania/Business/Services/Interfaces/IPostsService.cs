using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.Dto;
using PhotoMania.Business.PaginationModels;

namespace PhotoMania.Business.Services.Interfaces
{
    public interface IPostsService
    {
        Task<List<PostDto>> GetAllPosts(PostParameters postParameters);
        Task<List<PostDto>> GetUserPosts(PostParameters postParameters);
    }
}
