using AutoMapper;
using LPM.Database.Models;
using LPM.Infrastructure.Dto;

namespace LPM.WebApi.MappingConfiguration
{
    public class OrderAppointmentMappingProfile : Profile
    {
        public OrderAppointmentMappingProfile()
        {
            CreateMap<OrderAppointment, OrderAppointmentDto>()
                .ForMember(x => x.Id, i => i.MapFrom(j => j.Id))

                .ForMember(x => x.EmployeeId, i => i.MapFrom(j => j.EmployeeId))
                .ForMember(x => x.Employee, i => i.MapFrom(j => j.Employee))
                .ForMember(x => x.DepartmentId, i => i.MapFrom(j => j.DepartmentId))
                .ForMember(x => x.Department, i => i.MapFrom(j => j.Department))
                .ForMember(x => x.DateStart, i => i.MapFrom(j => j.DateStart))
                .ForMember(x => x.OficialDateStart, i => i.MapFrom(j => j.OficialDateStart))
                .ForMember(x => x.DateEnd, i => i.MapFrom(j => j.DateEnd))
                .ForMember(x => x.Position, i => i.MapFrom(j => j.Position))
                .ForMember(x => x.EmployeeType, i => i.MapFrom(j => j.EmployeeType))
                .ReverseMap();
        }
    }
}
