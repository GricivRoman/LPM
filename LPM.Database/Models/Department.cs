using LPM.Database.Models.Base;

namespace LPM.Database.Models
{
    /// <summary>
    /// Отдел-департамент
    /// </summary>
    public class Department : EntityWithName<Guid>
    {
        /// <summary>
        /// Сокращенное наименование
        /// </summary>
        public string ShortName { get; set; }

        /// <summary>
        /// Описание
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Сокращенное наименование
        /// </summary>
        public Guid OrganizationId { get; set; }

        /// <summary>
        /// Сокращенное наименование
        /// </summary>
        public Organizadion Organizadion { get; set; }

        /// <summary>
        /// Приказы о назначении в отдел
        /// </summary>
        public ICollection<OrderAppointment> OrderAppointments { get; set; }


    }
}
