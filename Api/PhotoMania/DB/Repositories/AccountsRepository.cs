using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PhotoMania.DB.Entities;

namespace PhotoMania.DB.Repositories
{
    public class AccountsRepository : BaseRepository<Account>
    {
        public AccountsRepository(DatabaseContext context) : base(context)
        {
        }
        public string HashPassword(string password)
        {
            var buff = MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(password));
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < buff.Length; i++)
            {
                sb.Append(buff[i].ToString("x2"));
            }
            return sb.ToString();
        }
    }
}
