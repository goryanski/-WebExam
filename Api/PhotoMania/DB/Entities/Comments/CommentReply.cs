using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.DB.Entities.Comments
{
    public class CommentReply: BaseEntity
    {
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public int LikesCount { get; set; }
        public int CommentId { get; set; }
        public Comment Comment { get; set; }      
        public int OwnerId { get; set; }
        public string OwnerName { get; set; }
        public int WhomId { get; set; }
        public string WhomName { get; set; }
    }
}
