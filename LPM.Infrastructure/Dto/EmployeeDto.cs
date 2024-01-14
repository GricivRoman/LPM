namespace LPM.Infrastructure.Dto
{
    // TODO разделить на 2 ДТОшки, выделить всё, что для грида в отдельную ДТО EmployeeListItemDto

    /// <summary>
    /// Сотрудник
    /// </summary>
    public class EmployeeDto : HumanDto
    {
        /// <summary>
        /// Возраст - полных лет
        /// </summary>
        public int Age { get; set; }

        /// <summary>
        /// Рабочее место
        /// </summary>
        public string WorkPlace { get; set; }

        /// <summary>
        /// Имеет ДМС (voluntary health insurance)
        /// </summary>
        public bool HasVHI { get; set; }

        /// <summary>
        /// Организация по актуальному договору
        /// </summary>
        public string ActualOrganizationName { get; set; }

        /// <summary>
        /// Департамент по актуальному договору
        /// </summary>
        public string ActualDepartmentName { get; set; }

        /// <summary>
        /// Дата начала работы по актуальному договору
        /// </summary>
        public DateTime? ActualDateStart { get; set; }

        /// <summary>
        /// Дата трудоустройства по актуальному договору
        /// </summary>
        public DateTime? ActualOficialDateStart { get; set; }

        /// <summary>
        /// Дата окончания испытательного срока по актуальному договору
        /// </summary>
        public DateTime? ActualProbationEndDate { get; set; }

        /// <summary>
        /// Должность по актуальному договору
        /// </summary>
        public string ActualPosition { get; set; }

        /// <summary>
        /// Тип позиции по актуальному договору
        /// </summary>
        public string ActualEmployeeTypeName { get; set; }

        /// <summary>
        /// Стаж работы в компании
        /// </summary>
        public double? ActualWorkLength { get; set; }

        /// <summary>
        /// Родственники
        /// </summary>
        public ICollection<RelativeDto> Relatives { get; set; }
    }
}
