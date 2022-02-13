using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Business.Services.Interfaces
{
    public interface ICommonService
    {
        public string ConvertDateToTimeAgo(DateTime dateTime);
    }
}
