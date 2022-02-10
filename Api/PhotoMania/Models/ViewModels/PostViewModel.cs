using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Models.ViewModels
{
    public class PostViewModel
    {
        public string Description { get; set; }
        public string DbPath { get; set; }
        public int UserId { get; set; }
    }
}
