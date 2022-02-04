using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Models.Response
{
    public class JwtResponse
    {
        public string AccessToken { get; set; }
        public string Exception { get; set; }
        public string UserRole { get; set; }
        public string UserId { get; set; }
    }
}
