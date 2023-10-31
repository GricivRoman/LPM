using ExcelMapper;
using LPM.Database;
using LPM.Database.Models;
using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Enums;
using LPM.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LPM.WebApi.Services
{
    public class FillerService : IFillerService
    {
        private readonly DataContext _context;

        public FillerService(DataContext context)
        {
            _context = context;
        }

        public async Task FillDBByExcelAsync(IFormFile file, Guid currentUserId)
        {
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                using (var importer = new ExcelImporter(ms))
                {
                    ExcelSheet sheet = importer.ReadSheet();
                    var sheetData = sheet.ReadRows<FillerFileStructureDto>().ToList();

                    var user = await _context.Set<User>().Where(x => x.Id == currentUserId).SingleOrDefaultAsync();

                    var organizations = CreateOrganizations(sheetData.Select(x => x.OrganizationName).Distinct().ToList(), user);
                    var departments = CreateDepartments(sheetData, organizations);
                    var employees = CreateEmployees(sheetData);
                    var orderAppointments = CreateOrderAppointments(sheetData, employees, departments);

                    await _context.SaveChangesAsync();
                }
            }
        }


        private List<Organizadion> CreateOrganizations(List<string> names, User user)
        {
            var organizationList = new List<Organizadion>();

            foreach (string name in names)
            {
                var org = new Organizadion
                {
                    Id = new Guid(),
                    Name = name,
                    ShortName = name,
                    Users = new List<User>()
                };
                org.Users.Add(user);

                organizationList.Add(org);
            }
            _context.Set<Organizadion>().AddRange(organizationList);

            return organizationList;
        }

        private List<Department> CreateDepartments(List<FillerFileStructureDto> sheetData, List<Organizadion> organizations)
        {
            var departmentList = new List<Department>();

            var depOrgPairs = sheetData
                .Select(x => new
                    {
                        departmentName = x.DepartmentName,
                        organizationName = x.OrganizationName
                    })
                .Distinct()
                .ToList();

            foreach (var depOrgPair in depOrgPairs)
            {
                var dep = new Department
                {
                    Id = new Guid(),
                    Name = depOrgPair.departmentName,
                    ShortName = depOrgPair.departmentName,
                    OrganizationId = organizations.Where(x => x.Name == depOrgPair.organizationName).Select(x => x.Id).Single()
                };
                departmentList.Add(dep);
            }
            _context.Set<Department>().AddRange(departmentList);

            return departmentList;
        }

        private List<Employee> CreateEmployees(List<FillerFileStructureDto> sheetData)
        {
            var employees = sheetData.Select(x => new Employee
            {
                Id = new Guid(),
                Name = x.EmployeeName,
                BirthDate = x.BirthDate,
                HasVHI = x.HasVHI,
                WorkPlace = x.WorkPlace,
                Sex = x.Sex == "м" ? SexEnum.Male : SexEnum.Female
            }).ToList();
            _context.Set<Employee>().AddRange(employees);

            return employees;
        }

        private List<OrderAppointment> CreateOrderAppointments(List<FillerFileStructureDto> sheetData, List<Employee> employees, List<Department> departments)
        {
            var orderAppointments = new List<OrderAppointment>();
            foreach (var employee in employees)
            {
                var fullEmployeeInfo = sheetData.Where(x => x.EmployeeName == employee.Name && x.BirthDate == employee.BirthDate).FirstOrDefault();
                var orderAppointment = new OrderAppointment
                {
                    Id = new Guid(),
                    DateStart = fullEmployeeInfo.DateStart,
                    OficialDateStart = fullEmployeeInfo.OficialDateStart,
                    DateEnd = null,
                    DepartmentId = departments.Where(x => x.Name == fullEmployeeInfo.DepartmentName).First().Id,
                    EmployeeId = employee.Id,
                    Position = fullEmployeeInfo.Position,
                    ProbationEndDate = fullEmployeeInfo.ProbationEndDate,
                    EmployeeType = GetEmployeeTypeFromFileStringValue(fullEmployeeInfo.EmployeeType)
                };
                orderAppointments.Add(orderAppointment);
            }
            _context.Set<OrderAppointment>().AddRange(orderAppointments);

            return orderAppointments;
        }

        private EmployeeTypeEnum GetEmployeeTypeFromFileStringValue(string type)
        {
            EmployeeTypeEnum currentType = EmployeeTypeEnum.OfficeWorker;

            switch (type)
            {
                case "п":
                currentType = EmployeeTypeEnum.FactoryWorker;
                    break;
                case "у":
                    currentType = EmployeeTypeEnum.Manager;
                    break;
                case "а":
                    currentType = EmployeeTypeEnum.OfficeWorker;
                    break;
            }

            return currentType;
        }
    }
}
