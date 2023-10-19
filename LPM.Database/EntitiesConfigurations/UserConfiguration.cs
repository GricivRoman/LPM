using LPM.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LPM.Database.EntitiesConfigurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasMany(x => x.Organizations)
                .WithMany(x => x.Users)
                .UsingEntity(
                i => i.HasOne(typeof(User)).WithMany().HasForeignKey("UserId").OnDelete(DeleteBehavior.NoAction),
                j => j.HasOne(typeof(Organizadion)).WithMany().HasForeignKey("OrganizadionId").OnDelete(DeleteBehavior.NoAction));
        }
    }
}
