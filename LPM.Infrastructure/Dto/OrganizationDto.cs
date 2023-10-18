namespace LPM.Infrastructure.Dto
{
    /// <summary>
    /// Организация
    /// </summary>
    public class OrganizationDto
    {
        public Guid? Id { get; set; }

        /// <summary>
        /// Наименование организации
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Сокращенное наименование
        /// </summary>
        public string ShortName { get; set; }

        /// <summary>
        /// Основная организация пользователя
        /// </summary>
        public bool MainOrganization { get; set; }

        /// <summary>
        /// Дата создания
        /// </summary>
        public DateTime? CreationDate { get; set; }

        /// <summary>
        /// Департаменты, входящие в организацию
        /// </summary>
        public ICollection<DepartmentDto> Departments { get; set; }

        /// <summary>
        /// Пользователи, которым доступна организация
        /// </summary>
        public ICollection<UserDto> Users { get; set; }

        /// <summary>
        /// Количество сотрудников
        /// </summary>
        public int EmployeesNumver { get; set; }
    }
}
