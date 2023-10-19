using LPM.Infrastructure.Enums;

namespace LPM.Infrastructure.Dto
{
    /// <summary>
    /// Приказ о назначении
    /// </summary>
    public class OrderAppointmentDto
    {
        public Guid? Id { get; set; }
        /// <summary>
        /// ID сотрудника
        /// </summary>
        public Guid EmployeeId { get; set; }

        /// <summary>
        /// Сотрудник
        /// </summary>
        public EmployeeDto Employee { get; set; }

        /// <summary>
        /// ID департамента
        /// </summary>
        public Guid DepartmentId { get; set; }

        /// <summary>
        /// Департамент
        /// </summary>
        public DepartmentDto Department { get; set; }

        /// <summary>
        /// Дата начала работы
        /// </summary>
        public DateTime DateStart { get; set; }

        /// <summary>
        /// Дата трудоустройства
        /// </summary>
        public DateTime? OficialDateStart { get; set; }

        /// <summary>
        /// Дата окончания испытательного срока
        /// </summary>
        public DateTime? ProbationEndDate { get; set; }

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
        public EmployeeTypeEnum EmployeeType { get; set; }
    }
}
