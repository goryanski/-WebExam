using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using PhotoMania.Business.Dto;
using PhotoMania.Business.ExtraModels;
using PhotoMania.DB.Entities;

namespace PhotoMania.Business.Automapper.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Post, PostDto>();
            CreateMap<PostDto, Post>();

            CreateMap<UserProfile, UserProfileDataResponse>();
            CreateMap<UserProfileDataResponse, UserProfile>();


        }
    }
}
