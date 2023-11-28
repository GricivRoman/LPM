using AutoMapper;
using LPM.Database.Models;
using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Enums;

namespace LPM.WebApi.MappingConfiguration
{
    public class OrderAppointmentMappingProfile : Profile
    {
        public OrderAppointmentMappingProfile()
        {
            CreateMap<OrderAppointment, OrderAppointmentDto>()
                .ForMember(x => x.Id, i => i.MapFrom(j => j.Id))
                .ForMember(x => x.EmployeeId, i => i.MapFrom(j => j.EmployeeId))
                .ForMember(x => x.DateStart, i => i.MapFrom(j => j.DateStart))
                .ForMember(x => x.OficialDateStart, i => i.MapFrom(j => j.OficialDateStart))
                .ForMember(x => x.DateEnd, i => i.MapFrom(j => j.DateEnd))
                .ForMember(x => x.Position, i => i.MapFrom(j => j.Position))
                .ForMember(x => x.EmployeeType, i => i.MapFrom(j => new SelectItemDto<int>
                {
                    Id = (int)j.EmployeeType,
                    Value = Enum.GetName(j.EmployeeType)
                }))
                .ForMember(x => x.Department, i => i.MapFrom(j => new SelectItemDto<Guid>
                {
                    Id = j.DepartmentId,
                    Value = j.Department.ShortName
                }))
                .ForMember(x => x.Organization, i => i.MapFrom(j => new SelectItemDto<Guid>
                {
                    Id = j.Department.OrganizationId,
                    Value = j.Department.Organizadion.ShortName
                }))
                .ForMember(x => x.WorkLength, i => i.MapFrom(j => Math.Round(((j.DateEnd ?? DateTime.Now) - j.DateStart).TotalDays / 365, 2)))
                .ReverseMap()
                .ForMember(x => x.EmployeeType, i => i.MapFrom(j => (SexEnum)j.EmployeeType.Id))
                .ForMember(x => x.DepartmentId, i => i.MapFrom(j => j.Department.Id))
                .ForMember(x => x.Department, i => i.Ignore());
        }
    }
}
