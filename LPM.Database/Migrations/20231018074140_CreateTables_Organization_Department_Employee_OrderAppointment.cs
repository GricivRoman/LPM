using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LPM.Database.Migrations
{
    /// <inheritdoc />
    public partial class CreateTables_Organization_Department_Employee_OrderAppointment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employee",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    BirthDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Sex = table.Column<int>(type: "integer", nullable: false),
                    WorkPlace = table.Column<string>(type: "text", nullable: true),
                    HasVHI = table.Column<bool>(type: "boolean", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Organizadion",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ShortName = table.Column<string>(type: "text", nullable: true),
                    MainOrganization = table.Column<bool>(type: "boolean", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizadion", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Department",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ShortName = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    OrganizationId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Department", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Department_Organizadion_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizadion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrganizadionUser",
                columns: table => new
                {
                    OrganizadionId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizadionUser", x => new { x.OrganizadionId, x.UserId });
                    table.ForeignKey(
                        name: "FK_OrganizadionUser_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OrganizadionUser_Organizadion_OrganizadionId",
                        column: x => x.OrganizadionId,
                        principalTable: "Organizadion",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OrderAppointment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uuid", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uuid", nullable: false),
                    DateStart = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    OficialDateStart = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    DateEnd = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Position = table.Column<string>(type: "text", nullable: true),
                    EmployeeType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderAppointment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderAppointment_Department_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Department",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OrderAppointment_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employee",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Department_OrganizationId",
                table: "Department",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderAppointment_DepartmentId",
                table: "OrderAppointment",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderAppointment_EmployeeId_DepartmentId",
                table: "OrderAppointment",
                columns: new[] { "EmployeeId", "DepartmentId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrganizadionUser_UserId",
                table: "OrganizadionUser",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderAppointment");

            migrationBuilder.DropTable(
                name: "OrganizadionUser");

            migrationBuilder.DropTable(
                name: "Department");

            migrationBuilder.DropTable(
                name: "Employee");

            migrationBuilder.DropTable(
                name: "Organizadion");
        }
    }
}
