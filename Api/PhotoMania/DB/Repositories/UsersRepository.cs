using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.DB.Entities;
using Microsoft.EntityFrameworkCore;

namespace PhotoMania.DB.Repositories
{
    public class UsersRepository : BaseRepository<UserProfile>
    {
        public UsersRepository(DatabaseContext context) : base(context)
        {
        }

        internal async Task<string> GetUsername(int userId)
        {
            return (await Table.Include(u => u.Account)
                .FirstAsync(u => u.Id == userId)).Account.Login;
        }

        internal async Task<int> GetUserId(int accountId)
        {
            // certainly exists
            return (await GetAllAsync(u => u.AccountId == accountId)).First().Id;
        }

        internal async Task<int> GetUserIdByName(string username)
        {
            return (await Table.Include(u => u.Account)
                .FirstAsync(u => u.Account.Login == username)).Id;
        }
    }
}
