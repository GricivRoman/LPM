using AutoMapper;
using LPM.Database.Models;
using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Enums;

namespace LPM.WebApi.MappingConfiguration
{
    public class RelativeMappingConfiguration : Profile
    {
        public RelativeMappingConfiguration()
        {
            CreateMap<Relative, RelativeDto>()
                .ForMember(x => x.Id, i => i.MapFrom(j => j.Id))
                .ForMember(x => x.BirthDate, i => i.MapFrom(j => j.BirthDate))
                .ForMember(x => x.Name, i => i.MapFrom(j => j.Name))
                .ForMember(x => x.Sex, i => i.MapFrom(j => new SelectItemDto<int>
                {
                    Id = (int)j.Sex,
                    Value = Enum.GetName(j.Sex)
                }))
                .ForMember(x => x.RelativeKind, i => i.MapFrom(j => j.RelativeKind))
                .ForMember(x => x.IsPreSchoolkid, i => i.MapFrom(j => j.IsPreSchoolkid))
                .ForMember(x => x.IsSchoolkid, i => i.MapFrom(j => j.IsSchoolkid))
                .ForMember(x => x.IsCripple, i => i.MapFrom(j => j.IsCripple))
                .ForMember(x => x.Employees, i => i.MapFrom(j => j.Employees))
                .ForMember(x => x.EmployeeId, i => i.Ignore())
                .ReverseMap()
                .ForMember(x => x.Sex, i => i.MapFrom(j => (SexEnum)j.Sex.Id))
                .ForMember(x => x.Employees, i => i.Ignore());
        }
    }
}
