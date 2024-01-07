namespace LPM.Infrastructure.Filters
{
    public class RelativeQueryFilter : PagedQueryFilter
    {
        /// <summary>
        /// Связанные сотрудники
        /// </summary>
        public IReadOnlyList<Guid> EmployeeIdList { get; set; }
    }
}
