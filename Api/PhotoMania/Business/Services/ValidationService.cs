using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using PhotoMania.Business.Services.Interfaces;

namespace PhotoMania.Business.Services
{
    public class ValidationService : IValidationService
    {
        public string LoginValidationError(string login)
        {
            //string response = "";
            //if (!Regex.IsMatch(login, "^[a-zA-Z_0-9]{4,14}$"))
            //{
            //    response = "Login must be English letters only, digits, symbol _ (4-14 symbols)\n";
            //}
            //return response;
            
            return !Regex.IsMatch(login, "^[a-zA-Z_0-9]{4,14}$")
                ? "Login must be English letters only, digits, symbol _ (4-14 symbols)\n"
                : "";
        }

        public string PasswordValidationError(string password)
        {
            //string response = "";
            //if (!Regex.IsMatch(password, "^[a-zA-Z_#@0-9]{4,16}$"))
            //{
            //    response = "Password must be English letters only, digits, symbols _ # @ (4-16 symbols)";
            //}
            //return response;
            return !Regex.IsMatch(password, "^[a-zA-Z_#@0-9]{4,16}$")
                ? "Password must be English letters only, digits, symbols _ # @ (4-16 symbols)\n"
                : "";
        }

        public string EmailValidationError(string email)
        {
            throw new NotImplementedException();
        }

        public string DescriptionValidationError(string description)
        {
            throw new NotImplementedException();
        }
    }
}
