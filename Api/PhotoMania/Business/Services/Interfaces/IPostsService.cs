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
        Task<List<PostDto>> GetAllPosts(PaginationParameters postParameters);
        Task<List<PostDto>> GetUserPosts(PaginationParameters postParameters, int userId);
        Task<List<PostDto>> GetPostsBySearchKey(PaginationParameters postParameters, string searchKey);
        Task<List<PostDto>> GetUserFavouritesPosts(PaginationParameters postParameters, int userId);
        Task<string> CreatePost(string description, string dbPath, int userId);
        Task<PostDto> GetPostById(int id);
    }
}
