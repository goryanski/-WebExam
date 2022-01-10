using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.DB.Entities
{
    public class Role: BaseEntity
    {
        public string Name { get; set; }
        public List<Account> Users { get; set; }
    }
}
