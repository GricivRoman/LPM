using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Filters;

namespace LPM.Infrastructure.Interfaces
{
    public interface IRelativeService
    {
        Task<RelativeDto> GetRelativeAsync(Guid relativeId);
        Task<List<RelativeDto>> GetEmployeeRelativesAsync(RelativeQueryFilter filter);
        Task<Guid> SaveRelativeAsync(RelativeDto model);
        Task DeleteRelativeAsync(Guid relativeId);
    }
}
