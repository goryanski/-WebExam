using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.DB.Entities
{
    public class Photo: BaseEntity
    {
        public string Url { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}