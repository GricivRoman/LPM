using LPM.Database.Models.Base;

namespace LPM.Database.Models
{
    /// <summary>
    /// Родственник сотрудника.
    /// </summary>
    public class Relative : Human
    {
        /// <summary>
        /// Вид родства
        /// </summary>
        public string RelativeKind { get; set; }

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
        public ICollection<Employee> Employees { get; set; }
    }
}
