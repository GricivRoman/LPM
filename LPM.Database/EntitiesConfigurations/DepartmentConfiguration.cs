using LPM.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LPM.Database.EntitiesConfigurations
{
    public class DepartmentConfiguration : IEntityTypeConfiguration<Department>
    {
        public void Configure(EntityTypeBuilder<Department> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.Id);
            builder.HasIndex(x => x.OrganizationId);

            builder.HasOne(x => x.Organizadion)
                .WithMany(x => x.Departments)
                .HasForeignKey(x => x.OrganizationId)
                .IsRequired();

            builder.HasMany(x => x.OrderAppointments)
                .WithOne(x => x.Department)
                .HasForeignKey(x => x.DepartmentId);
        }
    }
}
