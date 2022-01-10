using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.DB.Entities;

namespace PhotoMania.DB.Repositories.Interfaces
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task CreateAsync(T entity);
        Task<T> GetAsync(int id);
        Task UpdateAsync(T entity);
    }
}
