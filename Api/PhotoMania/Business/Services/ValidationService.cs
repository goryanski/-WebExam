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
            if(!Regex.IsMatch(login, "^[a-zA-Z_.^!0-9]{4,14}$"))
            {
                return "Login must be English letters only, digits, symbols _.^! (4-14 symbols).\n";
            }
            else if(!StringHasLetters(login, 4))
            {
                return "Login must contain at least 4 letters.\n";
            }
            else
            {
                return "";
            }
        }

        private bool StringHasLetters(string str, int requiredCountLetters)
        {
            int counter = 0;
            for (int i = 0; i < str.Length; i++)
            {
                if(Regex.IsMatch(str[i].ToString(), "^[a-zA-Z]{1}$"))
                {
                    counter++;
                    if(counter == requiredCountLetters)
                    {
                        break;
                    }
                }
            }
            return counter == requiredCountLetters;
        }

        public string PasswordValidationError(string password)
        {
            return !Regex.IsMatch(password, "^[a-zA-Z_#@.^!0-9]{4,16}$")
                ? "Password must be English letters only, digits, symbols _#@.^! (4-16 symbols).\n"
                : "";
        }

        public string EmailValidationError(string email)
        {
            return !Regex.IsMatch(email, @"^[a-zA-Z0-9][a-zA-Z0-9!#$%&+-/?^_{|}~]{2,32}@[a-zA-Z]{2,24}\.[a-zA-Z]{2,16}$")
               ? "Email is incorrect.\n"
               : "";
        }

        public string DescriptionValidationError(string description)
        {
            return !Regex.IsMatch(description, "^[a-zA-Z ,.!/:+@_0-9]{0,264}$")
               ? "Description must be English letters only, digits, space, symbols ,.!/+@:_ Max 264 symbols.\n"
               : "";
        }

        public string PostDescriptionValidationError(string description)
        {
            return !Regex.IsMatch(description, "^[a-zA-Z ,.!/:^+@_0-9]{4,64}$")
              ? "Description must be English letters only, digits, space, symbols ,.!/+@:_^ Max 64 symbols.\n"
              : "";
        }
    }
}
