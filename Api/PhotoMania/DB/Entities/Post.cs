using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.DB.Entities
{
    public class Post: BaseEntity
    {
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public int LikesCount { get; set; }
        public int DislikesCount { get; set; }


        public Photo Photo { get; set; }
        public List<Comment> Comments { get; set; }

        public UserProfile User { get; set; }
        public int UserId { get; set; }
    }
}
