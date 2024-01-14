namespace LPM.Infrastructure.Filters
{
    public class RelativeQueryFilter : PagedQueryFilter
    {
        /// <summary>
        /// Сотрудник, по которому идет отбор
        /// </summary>
        public Guid EmployeeId { get; set; }
    }
}
