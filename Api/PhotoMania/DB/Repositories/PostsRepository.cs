using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.DB.Entities;

namespace PhotoMania.DB.Repositories
{
    public class PostsRepository : BaseRepository<Post>
    {
        public PostsRepository(DatabaseContext context) : base(context)
        {
        }

        internal async Task<int> GetPostsCount(int userId)
        {
            return (await GetAllAsync(p => p.UserId == userId)).Count;
        }
    }
}
