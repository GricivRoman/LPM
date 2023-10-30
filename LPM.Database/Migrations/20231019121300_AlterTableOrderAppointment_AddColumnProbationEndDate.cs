using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LPM.Database.Migrations
{
    /// <inheritdoc />
    public partial class AlterTableOrderAppointment_AddColumnProbationEndDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ProbationEndDate",
                table: "OrderAppointment",
                type: "timestamp without time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProbationEndDate",
                table: "OrderAppointment");
        }
    }
}
