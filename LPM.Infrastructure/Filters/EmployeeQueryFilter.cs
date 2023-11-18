using LPM.Infrastructure.Dto;

namespace LPM.Infrastructure.Filters
{
    public class EmployeeQueryFilter : PagedQueryFilter
    {
        public SelectItemDto<Guid> Organization { get; set; }
        public SelectItemDto<Guid> Department { get; set; }
    }
}
