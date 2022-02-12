using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.DB.Entities.Comments;

namespace PhotoMania.DB.Repositories.Comments
{
    public class CommentRepliesRepository : BaseRepository<CommentReply>
    {
        public CommentRepliesRepository(DatabaseContext context) : base(context)
        {
        }
    }
}
