using LPM.Database.Models.Base;

namespace LPM.Database.Models
{
    /// <summary>
    /// Организация
    /// </summary>
    public class Organizadion : EntityWithName<Guid>
    {
        /// <summary>
        /// Сокращенное наименование
        /// </summary>
        public string ShortName { get; set; }

        /// <summary>
        /// Основная организация пользователя
        /// </summary>
        public bool IsMainOrganization { get; set; }

        /// <summary>
        /// Дата создания
        /// </summary>
        public DateTime? CreationDate { get; set; }

        /// <summary>
        /// Департаменты, входящие в организацию
        /// </summary>
        public ICollection<Department> Departments { get; set; }

        /// <summary>
        /// Пользователи, которым доступна организация
        /// </summary>
        public ICollection<User> Users { get; set; }
    }
}
