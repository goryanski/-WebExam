using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.DB.Entities
{
    public class FavouritePost : BaseEntity
    {
        public int UserId { get; set; }
        public int PostId { get; set; }
    }
}
