using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Business.Services.Interfaces.Auth
{
    public interface IMD5Service
    {
        string Hash(string str);
    }
}
