using LPM.Infrastructure.Enums;
using LPM.Database.Models.Base;

namespace LPM.Database.Models
{
    /// <summary>
    /// Карточка сотрудника
    /// </summary>
    public class Employee: EntityWithName<Guid>
    {
        /// <summary>
        /// Дата рождения
        /// </summary>
        public DateTime BirthDate { get; set; }

        /// <summary>
        /// Пол
        /// </summary>
        public SexEnum Sex { get; set; }

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

        public double GetAge()
        {
            return Math.Round((DateTime.Now - BirthDate).TotalDays / 365, 2);
        }
    }
}
