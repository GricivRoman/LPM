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
        public bool IsPreSchoolkid { get; set; } = false;

        /// <summary>
        /// Школьник
        /// </summary>
        public bool IsSchoolkid { get; set; } = false;

        /// <summary>
        /// Инвалид
        /// </summary>
        public bool IsCripple { get; set; } = false;

        /// <summary>
        /// Родственники, являющиеся сотрудниками
        /// </summary>
        public ICollection<EmployeeDto> Employees { get; set; }

        /// <summary>
        /// Родственник, для которого создается родственник.
        /// </summary>
        public Guid EmployeeId { get; set; }
    }
}
