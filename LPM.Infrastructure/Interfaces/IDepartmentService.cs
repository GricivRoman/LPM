using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Filters;

namespace LPM.Infrastructure.Interfaces
{
    public interface IDepartmentService
    {
        Task<DepartmentDto> GetDepartmentAsync(Guid id);
        Task<List<DepartmentDto>> GetDepartmentListAsync(DepartmentQueryFilter filter);
        Task<List<SelectItemDto<Guid>>> GettDepartmentSelectItemList(DepartmentQueryFilter filter);
        Task<Guid> SaveDepartmentAsync(DepartmentDto model);
        Task DeleteDepartmentAsync(Guid id);
    }
}
