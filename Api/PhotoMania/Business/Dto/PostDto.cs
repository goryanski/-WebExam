using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Business.Dto
{
    public class PostDto
    {
        public int Id { get; set; }
        public string PhotoPath { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }
        public int LikesCount { get; set; }
        public int DislikesCount { get; set; }
        public string Username { get; set; }
        public int CommentsCount { get; set; }
        public int UserId { get; set; }
    }
}
