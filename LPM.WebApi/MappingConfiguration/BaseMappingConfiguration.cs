using AutoMapper;
using LPM.Infrastructure.Dto;
using LPM.Database.Models.Base;

namespace LPM.WebApi.MappingConfiguration
{
    public class BaseMappingConfiguration : Profile
    {
        public BaseMappingConfiguration()
        {
            CreateMap<EntityWithName<Guid>, SelectItemDto<Guid>>()
                .ForMember(x => x.Id, i => i.MapFrom(u => u.Id))
                .ForMember(x => x.Value, i => i.MapFrom(u => u.Name));

            CreateMap<EntityWithName<int>, SelectItemDto<int>>()
                .ForMember(x => x.Id, i => i.MapFrom(u => u.Id))
                .ForMember(x => x.Value, i => i.MapFrom(u => u.Name));
        }
    }
}
