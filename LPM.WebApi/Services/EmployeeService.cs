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

        public async Task<List<EmployeeDto>> GetEmployeeListAsync(EmployeeQueryFilter filter)
        {
            List<Employee> employeeList;
            // TODO На уровне валидации проверять, что в фильтре департамент входит в организацию, если оба значения есть
            if (filter.OrganizationId != null || filter.DepartmentId != null)
            {
                var query = _context.Set<OrderAppointment>().AsQueryable();

                query = FilterOrderAppointmentByEmployeeFilter(query, filter);

                employeeList = await query
                    .PagedBy(filter.Paging)
                    .Select(x => x.Employee)
                    .ToListAsync();
            }
            else
            {
                // TODO Либо дать сотруднику базовую пренадлежность той организации, на которой он создавался, либо как-то еще определить его для конкретного пользователяч
                employeeList = await _context.Set<Employee>().ToListAsync();
            }

            return _mapper.Map<List<EmployeeDto>>(employeeList);
        }

        public async Task<List<SelectItemDto<Guid>>> GetEmployeeSelectItemList(EmployeeQueryFilter filter)
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



        private IQueryable<OrderAppointment> FilterOrderAppointmentByEmployeeFilter(IQueryable<OrderAppointment> query, EmployeeQueryFilter filter)
        {
            if (filter.OrganizationId != null)
            {
                query = query.Where(x => x.Department.OrganizationId == filter.OrganizationId);
            }

            if (filter.DepartmentId != null)
            {
                query = query.Where(x => x.DepartmentId == filter.DepartmentId);
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
    }
}
