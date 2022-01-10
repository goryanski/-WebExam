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
    }
}
