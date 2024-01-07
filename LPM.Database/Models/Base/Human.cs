using LPM.Infrastructure.Enums;

namespace LPM.Database.Models.Base
{
    /// <summary>
    /// Базовый класс человека
    /// </summary>
    public class Human : EntityWithName<Guid>
    {
        /// <summary>
        /// Дата рождения
        /// </summary>
        public DateTime BirthDate { get; set; }

        /// <summary>
        /// Пол
        /// </summary>
        public SexEnum Sex { get; set; }
    }
}
