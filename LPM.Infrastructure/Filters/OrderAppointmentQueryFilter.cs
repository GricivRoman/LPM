namespace LPM.Infrastructure.Filters
{
    public class OrderAppointmentQueryFilter : PagedQueryFilter
    {
        public Guid EmployeeId { get; set; }
    }
}
