using AutoMapper;
using LPM.Database.Models;
using LPM.Infrastructure.Dto;

namespace LPM.WebApi.MappingConfiguration
{
    public class UserMappingConfiguration : Profile
    {
        public UserMappingConfiguration()
        {
            CreateMap<User, UserDto>()
                .ForMember(x => x.Id, i => i.MapFrom(j => j.Id))
                .ForMember(x => x.Name, i => i.MapFrom(j => j.Name))
                .ForMember(x => x.Organizations, i => i.MapFrom(j => j.Organizations))
                .ReverseMap();
        }
    }
}
