using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.DB.Entities.Comments
{
    public class LikedComment: BaseEntity
    {
        public int UserId { get; set; }
        public int CommentId { get; set; }
    }
}
