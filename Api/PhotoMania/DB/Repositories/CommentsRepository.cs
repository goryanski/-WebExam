using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.DB.Entities;

namespace PhotoMania.DB.Repositories
{
    public class CommentsRepository : BaseRepository<Comment>
    {
        public CommentsRepository(DatabaseContext context) : base(context)
        {
        }

        internal async Task<int> GetCountAsync(int postId)
        {
            var comments = await GetAllAsync();
            return comments.Where(c => c.PostId == postId).Count();
        }
        //public async Task<int> GetCommentsCount(int postId)
        //{
        //    return await GetCountAsync();
        //}
    }
}
