using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LPM.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddTableRelatives_AlterTableEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Relative",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RelativeKind = table.Column<string>(type: "text", nullable: true),
                    IsPreSchoolkid = table.Column<bool>(type: "boolean", nullable: false),
                    IsSchoolkid = table.Column<bool>(type: "boolean", nullable: false),
                    IsCripple = table.Column<bool>(type: "boolean", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    BirthDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Sex = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Relative", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeRelative",
                columns: table => new
                {
                    EmployeeId = table.Column<Guid>(type: "uuid", nullable: false),
                    RelativeId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeRelative", x => new { x.EmployeeId, x.RelativeId });
                    table.ForeignKey(
                        name: "FK_EmployeeRelative_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeeRelative_Relative_RelativeId",
                        column: x => x.RelativeId,
                        principalTable: "Relative",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Organizadion_Id",
                table: "Organizadion",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_OrderAppointment_Id",
                table: "OrderAppointment",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_Id",
                table: "Employee",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Department_Id",
                table: "Department",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_Id",
                table: "AspNetUsers",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeRelative_RelativeId",
                table: "EmployeeRelative",
                column: "RelativeId");

            migrationBuilder.CreateIndex(
                name: "IX_Relative_Id",
                table: "Relative",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeRelative");

            migrationBuilder.DropTable(
                name: "Relative");

            migrationBuilder.DropIndex(
                name: "IX_Organizadion_Id",
                table: "Organizadion");

            migrationBuilder.DropIndex(
                name: "IX_OrderAppointment_Id",
                table: "OrderAppointment");

            migrationBuilder.DropIndex(
                name: "IX_Employee_Id",
                table: "Employee");

            migrationBuilder.DropIndex(
                name: "IX_Department_Id",
                table: "Department");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_Id",
                table: "AspNetUsers");
        }
    }
}
