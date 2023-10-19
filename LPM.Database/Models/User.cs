using Microsoft.AspNetCore.Identity;

namespace LPM.Database.Models
{
    /// <summary>
    /// Пользователь
    /// </summary>
    public class User : IdentityUser<Guid>
    {
        /// <summary>
        /// Имя
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Организации пользователя
        /// </summary>
        public ICollection<Organizadion> Organizations { get; set; }
    }
}
