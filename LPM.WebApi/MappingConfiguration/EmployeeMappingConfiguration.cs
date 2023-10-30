using AutoMapper;
using LPM.Database.Models;
using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Enums;

namespace LPM.WebApi.MappingConfiguration
{
    public class EmployeeMappingConfiguration : Profile
    {
        public EmployeeMappingConfiguration()
        {
            CreateMap<Employee, EmployeeDto>()
                .ForMember(x => x.Id, i => i.MapFrom(j => j.Id))
                .ForMember(x => x.BirthDate, i => i.MapFrom(j => j.BirthDate))
                .ForMember(x => x.WorkPlace, i => i.MapFrom(j => j.WorkPlace))
                .ForMember(x => x.OrderAppointments, i => i.MapFrom(j => j.OrderAppointments))
                .ForMember(x => x.HasVHI, i => i.MapFrom(j => j.HasVHI))
                .ForMember(x => x.Sex, i => i.MapFrom(j => new SelectItemDto<int>
                    {
                        Id = (int)j.Sex,
                        Value = Enum.GetName(j.Sex)
                    }))
                .ReverseMap()
                .ForMember(x => x.Sex, i => i.MapFrom(j => (SexEnum)j.Sex.Id));
        }
    }
}
