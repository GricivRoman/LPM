using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LPM.Database.Migrations
{
    /// <inheritdoc />
    public partial class AlterTableOrderAppointment_DeleteDefaultFilter : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrderAppointment_EmployeeId_DepartmentId",
                table: "OrderAppointment");

            migrationBuilder.CreateIndex(
                name: "IX_OrderAppointment_EmployeeId",
                table: "OrderAppointment",
                column: "EmployeeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrderAppointment_EmployeeId",
                table: "OrderAppointment");

            migrationBuilder.CreateIndex(
                name: "IX_OrderAppointment_EmployeeId_DepartmentId",
                table: "OrderAppointment",
                columns: new[] { "EmployeeId", "DepartmentId" },
                unique: true);
        }
    }
}
