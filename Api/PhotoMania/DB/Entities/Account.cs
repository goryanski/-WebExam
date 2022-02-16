using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.DB.Entities
{
    public class Account: BaseEntity
    {
        public string Login { get; set; }
        public string Password { get; set; }
        
        public int RoleId { get; set; }
        public Role Role { get; set; }

        public UserProfile Profile { get; set; }
    }
}
