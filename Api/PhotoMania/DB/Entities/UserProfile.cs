using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.DB.Entities
{
    public class UserProfile: BaseEntity
    {
        public string Email { get; set; }
        public string Description { get; set; }
        public bool IsBlocked { get; set; }
        public DateTime RegistrationDate { get; set; }


        public Avatar Avatar { get; set; }
        public int AccountId { get; set; }
        public Account Account { get; set; }

        public List<Post> Posts { get; set; }
    }
}
