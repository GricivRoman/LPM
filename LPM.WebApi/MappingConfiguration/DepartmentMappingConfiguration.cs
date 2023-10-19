using AutoMapper;
using LPM.Database.Models;
using LPM.Infrastructure.Dto;

namespace LPM.WebApi.MappingConfiguration
{
    public class DepartmentMappingConfiguration : Profile
    {
        public DepartmentMappingConfiguration()
        {
            CreateMap<Department, DepartmentDto>()
                .ForMember(x => x.Id, i => i.MapFrom(j => j.Id))
                .ForMember(x => x.Name, i => i.MapFrom(j => j.Name))
                .ForMember(x => x.ShortName, i => i.MapFrom(j => j.ShortName))
                .ForMember(x => x.Description, i => i.MapFrom(j => j.Description))
                .ForMember(x => x.OrganizationId, i => i.MapFrom(j => j.OrganizationId))
                .ForMember(x => x.Organization, i => i.MapFrom(j => j.Organizadion))
                .ForMember(x => x.OrderAppointments, i => i.MapFrom(j => j.OrderAppointments))
                .ReverseMap();
        }
    }
}
