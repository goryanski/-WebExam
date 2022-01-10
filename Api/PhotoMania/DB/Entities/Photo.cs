using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.DB.Entities
{
    public class Photo: BaseEntity
    {
        public string Name { get; set; }
        public string Url { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}

/* random string
 * https://overcoder.net/q/187406/%D0%BA%D0%B0%D0%BA-%D1%81%D0%B3%D0%B5%D0%BD%D0%B5%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D1%83%D1%8E-%D1%81%D1%82%D1%80%D0%BE%D0%BA%D1%83-%D0%B8-%D1%83%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C-%D0%B6%D0%B5%D0%BB%D0%B0%D0%B5%D0%BC%D1%83%D1%8E-%D0%B4%D0%BB%D0%B8%D0%BD%D1%83-%D0%B8%D0%BB%D0%B8-%D0%BB%D1%83%D1%87%D1%88%D0%B5
 
 or use date in miliseconds
 */