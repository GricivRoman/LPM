namespace LPM.Infrastructure.Dto
{
    /// <summary>
    /// Пользователь - организация
    /// </summary>
    public class UserDto
    {
        public Guid Id { get; set; }

        /// <summary>
        /// Имя пользователя
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// ОРганизации пользователя
        /// </summary>
        public ICollection<OrganizationDto> Organizations { get; set; }
    }
}
