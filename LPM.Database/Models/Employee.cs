using LPM.Database.Models.Base;

namespace LPM.Database.Models
{
    /// <summary>
    /// Карточка сотрудника
    /// </summary>
    public class Employee: Human
    {
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
        public ICollection<OrderAppointment> OrderAppointments { get; set; }

        /// <summary>
        /// Родственники
        /// </summary>
        public ICollection<Relative> Relatives { get; set; }
    }
}
