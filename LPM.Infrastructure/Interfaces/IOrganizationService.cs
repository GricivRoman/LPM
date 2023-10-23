using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Filters;

namespace LPM.Infrastructure.Interfaces
{
    public interface IOrganizationService
    {
        Task<OrganizationDto> GetOrganizationAsync(Guid id);
        Task<List<OrganizationDto>> GetOrganizationListAsync(PagedQueryFilter query);
        Task<List<SelectItemDto<Guid>>> GetOrganizationSelectItemList(PagedQueryFilter query);
        Task<Guid> SaveOrganizationAsync(OrganizationDto model);
        Task DeleteOrganizationAsync(Guid id);
    }
}
