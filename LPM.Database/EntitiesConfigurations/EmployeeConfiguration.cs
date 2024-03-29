﻿using LPM.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LPM.Database.EntitiesConfigurations
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.Id);

            builder.HasMany(x => x.OrderAppointments)
                .WithOne(x => x.Employee)
                .HasForeignKey(x => x.EmployeeId);
            
            builder.HasMany(x => x.Relatives)
                .WithMany(x => x.Employees)
                .UsingEntity(
                i => i.HasOne(typeof(Employee)).WithMany().HasForeignKey("EmployeeId"),
                j => j.HasOne(typeof(Relative)).WithMany().HasForeignKey("RelativeId"));
        }
    }
}
