using Microsoft.AspNetCore.Identity;

namespace LPM.Database.Models
{
    public class User : IdentityUser<Guid>
    {
        public string Name { get; set; }
    }
}
