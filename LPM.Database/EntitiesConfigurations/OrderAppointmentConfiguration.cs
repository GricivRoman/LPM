using LPM.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LPM.Database.EntitiesConfigurations
{
    public class OrderAppointmentConfiguration : IEntityTypeConfiguration<OrderAppointment>
    {
        public void Configure(EntityTypeBuilder<OrderAppointment> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.Employee)
                .WithMany(x => x.OrderAppointments)
                .HasForeignKey(x => x.EmployeeId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(x => x.Department)
                .WithMany(x => x.OrderAppointments)
                .HasForeignKey(x => x.DepartmentId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
