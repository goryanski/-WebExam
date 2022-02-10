using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhotoMania.Business.Exceptions;
using PhotoMania.Business.ExtraModels;
using PhotoMania.Business.Services.Interfaces.Auth;
using PhotoMania.Models.Response;
using PhotoMania.Models.ViewModels;

namespace PhotoMania.Controllers
{
    [Route("api/photoMania/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        IAccountsService accountsService;
        public AuthController(IAccountsService accountsService)
        {
            this.accountsService = accountsService;
        }

        [HttpPost("login")]
        public async Task<JwtResponse> Login([FromBody] LoginViewModel model)
        {
            JwtResponse response = new JwtResponse
            {
                AccessToken = "none",
                Exception = "none",
                UserRole = "none",
                UserId = "none"
            };
            try
            {
                var info = await accountsService.GetAccessToken(model.Login, model.Password);
                response.AccessToken = info.AccessToken;
                response.UserRole = info.UserRole;
                response.UserId = info.UserId;
            }
            catch (UserNotFoundException)
            {
                response.Exception = "User login not found";
            }
            catch (IncorrectUserPasswordException)
            {
                response.Exception = "Wrong password";
            }

            return response;
        }

        [HttpPost("registration")]
        public async Task<ApiResponse> Registration([FromBody] RegisterRequestModel model)
        {
            return new ApiResponse
            {
                Response = await accountsService.RegisterNewUser(model)
            };
        }
    }
}
