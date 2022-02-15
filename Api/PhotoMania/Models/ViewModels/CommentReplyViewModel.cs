using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Models.ViewModels
{
    public class CommentReplyViewModel
    {
        public string Text { get; set; }
        public int CommentId { get; set; }
        public int OwnerId { get; set; }
        public string WhomName { get; set; }
    }
}
