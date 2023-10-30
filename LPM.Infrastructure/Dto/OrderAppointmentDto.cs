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
        /// Организация
        /// </summary>
        public SelectItemDto<Guid> Organization { get; set; }

        /// <summary>
        /// Департамент
        /// </summary>
        public SelectItemDto<Guid> Department { get; set; }

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
        public SelectItemDto<int> EmployeeType { get; set; }
    }
}
