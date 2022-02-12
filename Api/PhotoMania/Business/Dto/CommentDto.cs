using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Business.Dto
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Date { get; set; }
        public int LikesCount { get; set; }
        public int PostId { get; set; }
        public int OwnerId { get; set; }
        public string OwnerName { get; set; }
        public int RepliesCount { get; set; }
    }
}
