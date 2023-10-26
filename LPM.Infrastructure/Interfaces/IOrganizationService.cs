using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Filters;

namespace LPM.Infrastructure.Interfaces
{
    public interface IOrganizationService
    {
        Task<OrganizationDto> GetOrganizationAsync(Guid id);
        Task<List<OrganizationDto>> GetOrganizationListAsync(OrganizationQueryFilter query);
        Task<List<SelectItemDto<Guid>>> GetOrganizationSelectItemList(OrganizationQueryFilter query);
        Task<Guid> SaveOrganizationAsync(OrganizationDto model, Guid userId);
        Task DeleteOrganizationAsync(Guid id);
    }
}
