using LPM.Infrastructure.Dto;

namespace LPM.Infrastructure.Filters
{
    /// <summary>
    /// Базовый фильтр сотрудников по связке организация + департамент
    /// </summary>
    public class BaseEmployeeQueryFilter : PagedQueryFilter
    {
        /// <summary>
        /// Организация
        /// </summary>
        public SelectItemDto<Guid> Organization { get; set; }

        /// <summary>
        /// Департамент
        /// </summary>
        public SelectItemDto<Guid> Department { get; set; }
    }
}
