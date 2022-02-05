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

        internal IEnumerable<Post> GetPosts(int pageNumber, int pageSize)
        {
            return FindAll()
                .OrderByDescending(on => on.Date) // latest posts
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // explanation: Say we need to get the results for the third page of our website, counting 20 as the number of results we want. That would mean we want to skip the first ((3 – 1) * 20) = 40 results, and then take the next 20 and return them to the caller.
        }

        internal async Task<int> GetPostsCount(int userId)
        {
            return (await GetAllAsync(p => p.UserId == userId)).Count;
        }
    }
}
