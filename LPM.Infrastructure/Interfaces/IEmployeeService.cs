using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Filters;

namespace LPM.Infrastructure.Interfaces
{
    public interface IEmployeeService
    {
        Task<EmployeeDto> GetEmployeeAsync(Guid id);
        Task<List<EmployeeDto>> GetEmployeeListAsync(EmployeeQueryFilter filter);
        Task<List<SelectItemDto<Guid>>> GetEmployeeSelectItemList(EmployeeQueryFilter filter);
        Task<Guid> SaveEmployeeAsync(EmployeeDto model);
        Task DeleteEmployeeAsync(Guid id);
    }
}
