using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.DB.Entities;

namespace PhotoMania.DB.Repositories
{
    public class HatedPostsRepository : BaseRepository<HatedPost>
    {
        public HatedPostsRepository(DatabaseContext context) : base(context)
        {
        }
    }
}
