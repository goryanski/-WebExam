using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Models.ViewModels
{
    public class CommentViewModel
    {
        public string Text { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
    }
}
