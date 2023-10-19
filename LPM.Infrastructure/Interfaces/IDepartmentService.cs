using LPM.Infrastructure.Dto;

namespace LPM.Infrastructure.Interfaces
{
    public interface IDepartmentService
    {
        Task<DepartmentDto> GetDepartmentAsync(Guid id);
        Task<List<DepartmentDto>> GetDepartmentListAsync();
        Task<List<SelectItemDto<Guid>>> GettDepartmentSelectItemList(Guid organizationId);
        Task<Guid> SaveDepartmentAsync(DepartmentDto model);
        Task DeleteDepartmentAsync(Guid id);
    }
}
