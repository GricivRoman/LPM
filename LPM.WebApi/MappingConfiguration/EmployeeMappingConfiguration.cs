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
                .ForMember(x => x.HasVHI, i => i.MapFrom(j => j.HasVHI))
                .ForMember(x => x.Relatives, i => i.MapFrom(j => j.Relatives))
                .ForMember(x => x.Sex, i => i.MapFrom(j => new SelectItemDto<int>
                    {
                        Id = (int)j.Sex,
                        Value = Enum.GetName(j.Sex)
                    }))
                .ForMember(x => x.Age, i => i.MapFrom(j =>
                    (DateTime.Now.Month > j.BirthDate.Month
                        || j.BirthDate.Month == DateTime.Now.Month && DateTime.Now.Day >= j.BirthDate.Day
                    ? 0 : -1) + DateTime.Now.Year - j.BirthDate.Year))
                .ForMember(x => x.ActualOrganizationName, i => i.MapFrom(j => 
                    j.OrderAppointments == null
                    ? null 
                    : j.OrderAppointments.Where(u => u.DateEnd == null).Select(o => o.Department.Organizadion.Name).FirstOrDefault()))
                .ForMember(x => x.ActualDepartmentName, i => i.MapFrom(j => 
                    j.OrderAppointments == null
                    ? null
                    : j.OrderAppointments.Where(u => u.DateEnd == null).Select(o => o.Department.Name).FirstOrDefault()))
                .ForMember(x => x.ActualDateStart, i => i.MapFrom(j =>
                    j.OrderAppointments == null
                    ? DateTime.UtcNow
                    : j.OrderAppointments.Where(u => u.DateEnd == null).Select(o => o.DateStart).FirstOrDefault()))
                .ForMember(x => x.ActualOficialDateStart, i => i.MapFrom(j =>
                    j.OrderAppointments == null
                    ? null
                    : j.OrderAppointments.Where(u => u.DateEnd == null).Select(o => o.OficialDateStart).FirstOrDefault()))
                .ForMember(x => x.ActualProbationEndDate, i => i.MapFrom(j =>
                    j.OrderAppointments == null
                    ? null
                    : j.OrderAppointments.Where(u => u.DateEnd == null).Select(o => o.ProbationEndDate).FirstOrDefault()))                
                .ForMember(x => x.ActualPosition, i => i.MapFrom(j =>
                    j.OrderAppointments == null
                    ? null
                    : j.OrderAppointments.Where(u => u.DateEnd == null).Select(o => o.Position).FirstOrDefault()))
                .ForMember(x => x.ActualEmployeeTypeName, i => i.MapFrom(j =>
                    j.OrderAppointments == null
                    ? null
                    : j.OrderAppointments.Where(u => u.DateEnd == null).Select(o => Enum.GetName(typeof(EmployeeTypeEnum), o.EmployeeType)).FirstOrDefault()))
                .ForMember(x => x.ActualWorkLength, i => i.MapFrom(j =>
                    j.OrderAppointments == null
                    ? 0
                    : j.OrderAppointments.Sum(o => Math.Round( ((o.DateEnd ?? DateTime.Now) - o.DateStart).TotalDays / 365, 2))))
                .ReverseMap()
                .ForMember(x => x.Sex, i => i.MapFrom(j => (SexEnum)j.Sex.Id));
        }
    }
}
