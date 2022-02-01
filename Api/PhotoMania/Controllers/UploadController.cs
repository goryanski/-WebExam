using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PhotoMania.Controllers
{
    [Route("api/photoMania/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        [HttpPost]
        public IActionResult Upload([FromQuery] string imgFolder) // string imgFolder (avatars or images) if we upload avatar - this image will be in folder "avatar", otherwise - in images
        {
            try
            {
                // extract the file from the request
                var file = Request.Form.Files[0];
                // define the path where the file will be stored  
                var folderName = Path.Combine("StaticFiles", imgFolder);         
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                // if the file has a length greater than zero, we just take its name and provide a full path on the server to store our file and a path to the database
                if (file.Length > 0)
                {
                    // extract the name of the file using ContentDispositionHeaderValue class
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    // set unique file name 
                    string uniqueKey = Guid.NewGuid().ToString();
                    string uniqueFileName = fileName.Insert(fileName.IndexOf('.'), uniqueKey);
                    // full path on the server to store our file 
                    var fullPath = Path.Combine(pathToSave, uniqueFileName);
                    // and a path to the database
                    var dbPath = Path.Combine(imgFolder, uniqueFileName);
                    // copy file and return result 
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

    }
}
