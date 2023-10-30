using LPM.Infrastructure.Dto;

namespace LPM.Infrastructure.Helpers
{
    public static class EmployeeCountHelper
    {
        public static int CountEmployeesOfOrganization(OrganizationDto org)
        {
            var appointmentsList = new List<OrderAppointmentDto>();

            var appointmentsCollections = org.Departments.Select(x => x.OrderAppointments);
            foreach (var collection in appointmentsCollections)
            {
                appointmentsList.AddRange(collection);
            }

            return CountUniqEmployeesFromAppointmentList(appointmentsList);
        }

        public static int CountEmployeesOfDepartment(DepartmentDto dep)
        {
            var appointmentsList = dep.OrderAppointments;

            return CountUniqEmployeesFromAppointmentList(appointmentsList);
        }

        private static int CountUniqEmployeesFromAppointmentList(ICollection<OrderAppointmentDto> appointmentsList)
        {
            var employeesNumber = appointmentsList.Where(x => x.DateEnd == null).DistinctBy(x => x.EmployeeId).Count();

            return employeesNumber;
        }
    }
}
