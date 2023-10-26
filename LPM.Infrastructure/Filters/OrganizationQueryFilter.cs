namespace LPM.Infrastructure.Filters
{
    public class OrganizationQueryFilter : PagedQueryFilter
    {
        public Guid UserId { get; set; }
        public bool TakeOnlyMainOrganization { get; set; }
    }
}
