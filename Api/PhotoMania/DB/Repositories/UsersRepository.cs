using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.DB.Entities;

namespace PhotoMania.DB.Repositories
{
    public class UsersRepository : BaseRepository<UserProfile>
    {
        public UsersRepository(DatabaseContext context) : base(context)
        {
        }
    }
}
