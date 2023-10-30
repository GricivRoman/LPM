using LPM.Infrastructure.Enums;

namespace LPM.Infrastructure.Dto
{
    /// <summary>
    /// Сотрудник
    /// </summary>
    public class EmployeeDto
    {
        public Guid? Id { get; set; }

        /// <summary>
        /// Имя сотрудника
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Дата рождения
        /// </summary>
        public DateTime BirthDate { get; set; }

        /// <summary>
        /// Пол
        /// </summary>
        public SelectItemDto<int> Sex { get; set; }

        /// <summary>
        /// Рабочее место
        /// </summary>
        public string WorkPlace { get; set; }

        /// <summary>
        /// Имеет ДМС (voluntary health insurance)
        /// </summary>
        public bool HasVHI { get; set; }

        /// <summary>
        /// Приказ о назначении
        /// </summary>
        public ICollection<OrderAppointmentDto> OrderAppointments { get; set; }
    }
}
