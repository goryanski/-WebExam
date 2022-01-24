using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Business.PaginationModels
{
    public class PostParameters
    {
        // We are using constant maxPageSize to restrict our API to a maximum of 50 posts
        const int maxPageSize = 50;


        // We have two public properties – PageNumber and PageSize. If not set by the caller, PageNumber will be set to 1, and PageSize to 10.
        public int PageNumber { get; set; } = 1;
        // private field _pageSize
        private int _pageSize = 2;
        // PageSize property exposes private field _pageSize
        public int PageSize
        {
            get
            {
                // in the get method we just return the page size field
                return _pageSize;
            }
            set
            {
                // in the set method we set the value of the page size with condition limiting the highest value to the maxPageSize value 
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
    }
}
