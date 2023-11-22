using AutoMapper;
using LPM.Database;
using LPM.Database.Models;
using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Enums;
using LPM.Infrastructure.Extensions;
using LPM.Infrastructure.Filters;
using LPM.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LPM.WebApi.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public EmployeeService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<EmployeeDto> GetEmployeeAsync(Guid id)
        {
            var employee = await GetEmployeeById(id);
            return _mapper.Map<EmployeeDto>(employee);
        }

        public async Task<List<EmployeeDto>> GetEmployeeListAsync(EmployeeGridListFilter filter)
        {
            var employees = _context.Set<Employee>().AsQueryable();
            employees = GetFilteredEmployeQuery(employees, filter);

            return _mapper.Map<List<EmployeeDto>>(await employees.ToListAsync());
        }

        public async Task<List<SelectItemDto<Guid>>> GetEmployeeSelectItemList(BaseEmployeeQueryFilter filter)
        {
            var query = _context.Set<OrderAppointment>().AsQueryable();

            query = FilterOrderAppointmentByEmployeeFilter(query, filter);

            var selectItemList = await query
                .PagedBy(filter.Paging)
                .Select(x => new SelectItemDto<Guid>
                {
                    Id = x.Employee.Id,
                    Value = x.Employee.Name
                })
                .ToListAsync();

            return selectItemList;
        }

        public async Task<Guid> SaveEmployeeAsync(EmployeeDto model)
        {
            Employee employee;

            if(model.Id != null)
            {
                employee = await GetEmployeeById((Guid)model.Id);
            }
            else
            {
                employee = new Employee
                {
                    Id= Guid.NewGuid()
                };
                _context.Add(employee);
            }

            employee.BirthDate = model.BirthDate;
            employee.WorkPlace = model.WorkPlace;
            employee.Name = model.Name;
            employee.Sex = (SexEnum)model.Sex.Id;
            employee.HasVHI = model.HasVHI;

            await _context.SaveChangesAsync();

            return employee.Id;
        }

        public async Task DeleteEmployeeAsync(Guid id)
        {
            var employee = await GetEmployeeById(id);

            if (employee.OrderAppointments.Where(x => x.DateEnd == null).Count() != 0)
            {
                throw new ApplicationException("Нельзя удалить сотрудника с действующим договором");
            }
            _context.Set<Employee>().Remove(employee);
            await _context.SaveChangesAsync();
        }

        private IQueryable<OrderAppointment> FilterOrderAppointmentByEmployeeFilter(IQueryable<OrderAppointment> query, BaseEmployeeQueryFilter filter)
        {
            if (filter.Organization?.Id != null)
            {
                query = query.Where(x => x.Department.OrganizationId == filter.Organization.Id);
            }

            if (filter.Department?.Id != null)
            {
                query = query.Where(x => x.DepartmentId == filter.Department.Id);
            }

            return query;
        }

        private async Task<Employee> GetEmployeeById(Guid id)
        {
            var employee = await _context.Set<Employee>()
                .Include(x => x.OrderAppointments)
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();

            if (employee == null)
            {
                throw new ApplicationException("Сотрудника с указанным ID не существует");
            }
            
            return employee;
        }

        private IQueryable<Employee> GetFilteredEmployeQuery(IQueryable<Employee> query, EmployeeGridListFilter filter)
        {
            if (filter.Organization != null)
            {
                query = query.Where(x => GetOrdetAppointmentForEmplouee(x) != null && GetOrdetAppointmentForEmplouee(x).Department.OrganizationId == filter.Organization.Id);
            }

            if (filter.DepartmentList != null && filter.DepartmentList.Count != 0)
            {
                query = query.Where(x => GetOrdetAppointmentForEmplouee(x) != null && filter.DepartmentList.Any(i => i.Id == GetOrdetAppointmentForEmplouee(x).DepartmentId));
            }

            if (filter.AgeDiapazoneStart != null)
            {
                query = query.Where(x => x.GetAge() >= filter.AgeDiapazoneStart);
            }

            if (filter.AgeDiapazoneEnd != null)
            {
                query = query.Where(x => x.GetAge() <= filter.AgeDiapazoneEnd);
            }

            if (filter.Sex != null)
            {
                query = query.Where(x => x.Sex == (SexEnum)filter.Sex.Id);
            }

            if (filter.HasVMI != null)
            {
                query = query.Where(x => x.HasVHI == filter.HasVMI);
            }

            if (filter.Position != null)
            {
                query = query.Where(x => GetOrdetAppointmentForEmplouee(x) != null && filter.Position.Any(i => i.Value == GetOrdetAppointmentForEmplouee(x).Position));
            }

            if (filter.PositionType != null)
            {
                query = query.Where(x => GetOrdetAppointmentForEmplouee(x) != null && filter.PositionType.Any(i => (EmployeeTypeEnum)i.Id == GetOrdetAppointmentForEmplouee(x).EmployeeType));
            }

            if (filter.DateStartPeriodStart != null)
            {
                query = query.Where(x => GetOrdetAppointmentForEmplouee(x) != null && GetOrdetAppointmentForEmplouee(x).DateStart >= filter.DateStartPeriodStart);
            }

            if (filter.DateStartPeriodEnd != null)
            {
                query = query.Where(x => GetOrdetAppointmentForEmplouee(x) != null && GetOrdetAppointmentForEmplouee(x).DateStart >= filter.DateStartPeriodEnd);
            }

            if (filter.OnProbationPeriod != null)
            {
                //query = query.Where(x => GetOrdetAppointmentForEmplouee(x) != null && filter.OnProbationPeriod == GetOrdetAppointmentForEmplouee(x).ProbationEndDate < DateTime.Now);
            }

            if (filter.WorkLengthDiapazoneStart != null)
            {
                query = query.Where(x => x.OrderAppointments.Select(i => GetWorkLengthForOrderAppointment(i)).Sum() >= filter.WorkLengthDiapazoneStart);
            }

            if (filter.WorkLengthDiapazoneEnd != null)
            {
                query = query.Where(x => x.OrderAppointments.Select(i => GetWorkLengthForOrderAppointment(i)).Sum() <= filter.WorkLengthDiapazoneEnd);
            }

            return query.PagedBy(filter.Paging);
        }

        private OrderAppointment GetOrdetAppointmentForEmplouee(Employee employee)
        {
            return employee.OrderAppointments.Where(x => x.DateEnd == null).FirstOrDefault();
        }

        private double GetWorkLengthForOrderAppointment(OrderAppointment orderAppointment)
        {
            var dateEnd = orderAppointment.DateEnd == null ? DateTime.Now : orderAppointment.DateEnd;
            var workingTime = (DateTime)dateEnd - orderAppointment.DateStart;

            return Math.Round(workingTime.TotalDays / 365, 2);
        }
    }
}
