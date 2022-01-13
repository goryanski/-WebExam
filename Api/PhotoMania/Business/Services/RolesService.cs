using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhotoMania.Business.Dto;
using PhotoMania.Business.Services.Interfaces;
using PhotoMania.DB.Repositories.Interfaces;

namespace PhotoMania.Business.Services
{
    public class RolesService : IRolesService
    {
        private IUnitOfWork uow;
        private Automapper.ObjectMapper objectMapper = Automapper.ObjectMapper.Instance;

        public RolesService(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        public async Task<List<RoleDto>> GetAllRoles()
        {
            var result = await uow.RolesRepository.GetAllAsync();
            return objectMapper.Mapper.Map<List<RoleDto>>(result);
        }
    }
}
