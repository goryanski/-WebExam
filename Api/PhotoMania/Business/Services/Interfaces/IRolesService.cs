using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.Dto;

namespace PhotoMania.Business.Services.Interfaces
{
    public interface IRolesService
    {
        Task<List<RoleDto>> GetAllRoles();
    }
}
