using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PhotoMania.DB.Entities;
using PhotoMania.DB.Repositories.Interfaces;

namespace PhotoMania.DB.Repositories
{
    public class BaseRepository<T> : IRepository<T> where T : BaseEntity
    {
        protected DatabaseContext db;

        protected DbSet<T> Table => db.Set<T>();

        public BaseRepository(DatabaseContext context)
        {
            db = context;
        }
        public async Task CreateAsync(T entity)
        {
            db.Entry(entity).State = EntityState.Added;
            await db.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await Task.FromResult(Table.ToList());
        }
        public virtual async Task<List<T>> GetAllAsync(Func<T, bool> predicate)
        {
            return await Task.Run(() => Table.Where(predicate).ToList());
        }
        public IQueryable<T> FindAll()
        {
            return this.Table;
        }

        public async Task<T> GetAsync(int id)
        {
            return await Table.FirstOrDefaultAsync(entity => entity.Id == id);
        }
        //public async Task<int> GetCountAsync()
        //{
        //    return await Task.FromResult(Table.ToList().Count());
        //}

        public async Task UpdateAsync(T entity)
        {
            db.Entry(entity).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }
    }
}
