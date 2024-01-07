namespace LPM.Infrastructure.Dto
{
    /// <summary>
    /// ДТО родственника
    /// </summary>
    public class RelativeDto : HumanDto
    {
        // TODO Подумать над выделением в Enum, обсудить с заказчиком виды
        /// <summary>
        /// Вид родства
        /// </summary>
        public string RelativeKind { get; set; }

        // TODO Подумать над выделением в Enum, обсудить с заказчиком виды
        /// <summary>
        /// Дошкольник
        /// </summary>
        public bool IsPreSchoolkid { get; set; }

        /// <summary>
        /// Школьник
        /// </summary>
        public bool IsSchoolkid { get; set; }

        /// <summary>
        /// Инвалид
        /// </summary>
        public bool IsCripple { get; set; }

        /// <summary>
        /// Родственники, являющиеся сотрудниками
        /// </summary>
        public ICollection<EmployeeDto> Employees { get; set; }
    }
}
