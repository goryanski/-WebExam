using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.DB.Entities.Comments
{
    public class Comment: BaseEntity
    {
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public int LikesCount { get; set; }       

        public Post Post { get; set; }
        public int PostId { get; set; }
        public List<CommentReply> Replies { get; set; }


        // leave name or id
        public int OwnerId { get; set; }
        public string OwnerName { get; set; }


        //public UserProfile User { get; set; }
        //public int UserId { get; set; }
    }
}
