using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.DB.Entities;

namespace PhotoMania.DB.Repositories
{
    public class PhotosRepository : BaseRepository<Photo>
    {
        public PhotosRepository(DatabaseContext context) : base(context)
        {
        }
    }
}
