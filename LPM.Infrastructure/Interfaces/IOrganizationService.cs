using LPM.Infrastructure.Dto;

namespace LPM.Infrastructure.Interfaces
{
    public interface IOrganizationService
    {
        Task<OrganizationDto> GetOrganizationAsync(Guid id);
        Task<List<OrganizationDto>> GetOrganizationListAsync();
        Task<Guid> SaveOrganizationAsync(OrganizationDto model);
        Task DeleteOrganizationAsync(Guid id);
    }
}
