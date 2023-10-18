using LPM.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LPM.Database.EntitiesConfigurations
{
    public class OrganizationConfiguration : IEntityTypeConfiguration<Organizadion>
    {
        public void Configure(EntityTypeBuilder<Organizadion> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasMany(x => x.Users)
                .WithMany(x => x.Organizations)
                .UsingEntity(
                i => i.HasOne(typeof(User)).WithMany().HasForeignKey("UserId").OnDelete(DeleteBehavior.NoAction),
                j => j.HasOne(typeof(Organizadion)).WithMany().HasForeignKey("OrganizadionId").OnDelete(DeleteBehavior.NoAction));

            builder.HasMany(x => x.Departments)
                .WithOne(x => x.Organizadion)
                .HasForeignKey(x => x.OrganizationId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
