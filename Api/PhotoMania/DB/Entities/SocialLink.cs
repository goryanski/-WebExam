using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.DB.Entities
{
    // link to social network
    public class SocialLink: BaseEntity
    {
        public string Link { get; set; }

        public int UserId { get; set; }
        public UserProfile User { get; set; }
    }
}
