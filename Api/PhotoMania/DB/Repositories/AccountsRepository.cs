using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.DB.Entities;

namespace PhotoMania.DB.Repositories
{
    public class AccountsRepository : BaseRepository<Account>
    {
        public AccountsRepository(DatabaseContext context) : base(context)
        {
        }
    }
}
