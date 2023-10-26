namespace LPM.Infrastructure.Filters
{
    public class DepartmentQueryFilter : PagedQueryFilter
    {
        public Guid? OrganizationId { get; set; }
        public Guid? UserId { get; set; }
    }
}
