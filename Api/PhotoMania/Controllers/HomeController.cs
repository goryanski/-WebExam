using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoMania.Business.Dto;
using PhotoMania.Business.Services.Interfaces;
using PhotoMania.DB.Entities;
using PhotoMania.DB.Repositories;
using PhotoMania.DB.Repositories.Interfaces;

namespace PhotoMania.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        IRolesService rolesService;

        public HomeController(IRolesService rolesService)
        {
            this.rolesService = rolesService;
        }

        //[HttpGet]
        //public string GetInfo()
        //{
        //    return "Hello, cursach!";
        //}

        [AllowAnonymous]
        [HttpGet]
        public async Task<List<RoleDto>> GetInfo()
        {
            return await rolesService.GetAllRoles();
        }


        // pagination https://forproger.ru/article/paginaciya-v-aspnet-core-web-api
    }
}
