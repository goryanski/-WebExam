﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoMania.Business.ExtraModels
{
    public class RegisterRequestModel
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public string AvatarPath { get; set; }
    }
}
