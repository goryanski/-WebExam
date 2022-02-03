using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Business.Services.Interfaces
{
    public interface IValidationService
    {
        string LoginValidationError(string login);
        string PasswordValidationError(string password);
        string EmailValidationError(string email);
        string DescriptionValidationError(string description);
    }
}
