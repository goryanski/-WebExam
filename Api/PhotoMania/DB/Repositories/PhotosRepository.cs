using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.DB.Entities;

namespace PhotoMania.DB.Repositories
{
    public class PhotosRepository : BaseRepository<Photo>
    {
        public PhotosRepository(DatabaseContext context) : base(context)
        {
        }

        internal async Task<string> GetPath(int postId)
        {
            var photos = await GetAllAsync(ph => ph.PostId == postId);
            return photos.First().Url;
        }
        //internal async Task<int> GetCountAsync(int postId)
        //{
        //    var comments = await GetAllAsync(c => c.PostId == postId);
        //    return comments.Count();
        //}
    }
}
