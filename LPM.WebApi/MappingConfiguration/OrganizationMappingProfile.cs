using AutoMapper;
using LPM.Database.Models;
using LPM.Infrastructure.Dto;

namespace LPM.WebApi.MappingConfiguration
{
    public class OrganizationMappingProfile: Profile
    {
        public OrganizationMappingProfile()
        {
            CreateMap<Organizadion, OrganizationDto>()
                .ForMember(x => x.Id, i => i.MapFrom(j => j.Id))
                .ForMember(x => x.Name, i => i.MapFrom(j => j.Name))
                .ForMember(x => x.ShortName, i => i.MapFrom(j => j.ShortName))
                .ForMember(x => x.MainOrganization, i => i.MapFrom(j => j.MainOrganization))
                .ForMember(x => x.CreationDate, i => i.MapFrom(j => j.CreationDate))
                .ForMember(x => x.Users, i => i.MapFrom(j => j.Users))
                .ForMember(x => x.Departments, i => i.MapFrom(j => j.Departments))
                .ForMember(x => x.EmployeesCount, i => i.Ignore())
                .ReverseMap();
                
        }
    }
}
