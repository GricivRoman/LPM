using LPM.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LPM.Database.EntitiesConfigurations
{
    public class RelativeConfiguration : IEntityTypeConfiguration<Relative>
    {
        public void Configure(EntityTypeBuilder<Relative> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.Id);

            builder.HasMany(x => x.Employees)
                .WithMany(x => x.Relatives)
                .UsingEntity(
                i => i.HasOne(typeof(Employee)).WithMany().HasForeignKey("EmployeeId"),
                j => j.HasOne(typeof(Relative)).WithMany().HasForeignKey("RelativeId"));
        }
    }
}
