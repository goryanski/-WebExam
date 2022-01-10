using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.DB.Entities
{
    public class Avatar : BaseEntity
    {
        public string Name { get; set; }
        public string Url { get; set; }

        public int UserId { get; set; }
        public UserProfile User { get; set; }
    }
}
