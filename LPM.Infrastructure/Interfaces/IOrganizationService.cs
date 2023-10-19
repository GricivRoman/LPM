using LPM.Infrastructure.Dto;

namespace LPM.Infrastructure.Interfaces
{
    public interface IOrganizationService
    {
        Task<OrganizationDto> GetOrganizationAsync(Guid id);
        Task<List<OrganizationDto>> GetOrganizationListAsync();
        Task<List<SelectItemDto<Guid>>> GetOrganizationSelectItemList();
        Task<Guid> SaveOrganizationAsync(OrganizationDto model);
        Task DeleteOrganizationAsync(Guid id);
    }
}
