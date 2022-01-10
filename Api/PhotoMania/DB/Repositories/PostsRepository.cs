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

        //public async Task Update(Photo entity)
        //{
            
        //}
    }
}
