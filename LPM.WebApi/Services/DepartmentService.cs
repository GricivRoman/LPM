using AutoMapper;
using LPM.Database;
using LPM.Database.Models;
using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Extensions;
using LPM.Infrastructure.Filters;
using LPM.Infrastructure.Helpers;
using LPM.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LPM.WebApi.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public DepartmentService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<DepartmentDto> GetDepartmentAsync(Guid id)
        {
            var department = await _context.Set<Department>()
                    .Where(x => x.Id == id)
                    .Include(x => x.Organizadion)
                    .SingleOrDefaultAsync();

            return _mapper.Map<DepartmentDto>(department);
        }

        public async Task<List<DepartmentDto>> GetDepartmentListAsync(DepartmentQueryFilter query)
        {
            var departmentQuery = _context.Set<Department>()
                    .Include(x => x.OrderAppointments)
                    .Include(x => x.Organizadion)
                    .ThenInclude(x => x.Users).AsQueryable();

            if (query.UserId != null)
            {
                departmentQuery = departmentQuery.Where(x => x.Organizadion.Users.Any(i => i.Id == query.UserId));
            }

            if (query.OrganizationId != null)
            {
                departmentQuery = departmentQuery.Where(x => x.OrganizationId == query.OrganizationId);
            }

            var departmentList = await departmentQuery.PagedBy(query.Paging).ToListAsync();

            return _mapper.Map<List<DepartmentDto>>(departmentList).Map(x => x.EmployeesNumber = EmployeeCountHelper.CountEmployeesOfDepartment(x)).ToList();
        }

        public async Task<List<SelectItemDto<Guid>>> GettDepartmentSelectItemList(DepartmentQueryFilter query)
        {
            if(query.OrganizationId == null)
            {
                throw new ApplicationException("Невозможно выбрать список департаментов без указания организации");
            }

            var selectList = await _context.Set<Department>()
                .Where(x => x.OrganizationId == query.OrganizationId)
                .PagedBy(query.Paging)
                .Select(x => new SelectItemDto<Guid>
                {
                    Id = x.Id,
                    Value = x.ShortName
                })
                .ToListAsync();

            return selectList;
        }

        public async Task<Guid> SaveDepartmentAsync(DepartmentDto model)
        {
            if (model.Organization ==null)
            {
                throw new ApplicationException("Необходимо заполнить поле Огранизация");
            }

            Department department;

            if (model.Id.HasValue)
            {
                department = await _context.Set<Department>().Where(x => x.Id == model.Id).SingleOrDefaultAsync();
            }
            else
            {
                department = new Department()
                {
                    Id = new Guid()
                };
                _context.Add(department);
            }

            department.OrganizationId = model.Organization.Id;
            department.Name = model.Name;
            department.ShortName = model.ShortName;
            department.Description = model.Description;

            await _context.SaveChangesAsync();

            return department.Id;
        }

        public async Task DeleteDepartmentAsync(Guid id)
        {
            var employeesNumber = await _context.Set<OrderAppointment>()
                .Where(x => x.DepartmentId == id)
                .Select(x => x.EmployeeId)
                .CountAsync();

            if (employeesNumber > 0)
            {
                throw new ApplicationException("Невозможно удалить отдел с действующими сотрудниками");
            }

            var department = await _context.Set<Department>()
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();

            _context.Remove(department);

            await _context.SaveChangesAsync();
        }
    }
}
