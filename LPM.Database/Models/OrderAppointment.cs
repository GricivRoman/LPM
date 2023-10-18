using LPM.Database.Enums;
using LPM.Database.Models.Base;

namespace LPM.Database.Models
{
    /// <summary>
    /// Приказ о назначении
    /// </summary>
    public class OrderAppointment : BaseEntity<Guid>
    {
        /// <summary>
        /// ID сотрудника
        /// </summary>
        public Guid EmployeeId { get; set; }

        /// <summary>
        /// Сотрудник
        /// </summary>
        public Employee Employee { get; set; }

        /// <summary>
        /// ID департамента
        /// </summary>
        public Guid DepartmentId { get; set; }

        /// <summary>
        /// Департамент
        /// </summary>
        public Department Department { get; set; }

        /// <summary>
        /// Дата начала работы
        /// </summary>
        public DateTime DateStart { get; set; }

        /// <summary>
        /// Дата трудоустройства
        /// </summary>
        public DateTime OficialDateStart { get; set; }

        /// <summary>
        /// Дата окончания
        /// </summary>
        public DateTime? DateEnd { get; set; }

        /// <summary>
        /// Должность
        /// </summary>
        public string Position { get; set; }

        /// <summary>
        /// Тип позиции
        /// </summary>
        public EmployeeType EmployeeType { get; set; }
    }
}
