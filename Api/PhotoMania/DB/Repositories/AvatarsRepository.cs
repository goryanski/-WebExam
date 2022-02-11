using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.DB.Entities;

namespace PhotoMania.DB.Repositories
{
    public class AvatarsRepository : BaseRepository<Avatar>
    {
        public AvatarsRepository(DatabaseContext context) : base(context)
        {
        }

        internal async Task<string> GetAvatarPath(int userId)
        {
            return (await GetAllAsync(a => a.UserId == userId)).First().Url;
        }

        public async Task<Avatar> GetAvatarByUserId(int userId)
        {
            return (await GetAllAsync(a => a.UserId == userId)).First();
        }
    }
}
