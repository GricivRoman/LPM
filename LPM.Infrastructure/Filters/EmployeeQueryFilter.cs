namespace LPM.Infrastructure.Filters
{
    public class EmployeeQueryFilter : PagedQueryFilter
    {
        public Guid OrganizationId { get; set; }

        public Guid DepartmentId { get; set; }
    }
}
