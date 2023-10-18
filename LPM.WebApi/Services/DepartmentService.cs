﻿using AutoMapper;
using LPM.Database;
using LPM.Database.Models;
using LPM.Infrastructure.Dto;
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
            var department = await _context.Set<Department>().Where(x => x.Id == id).SingleOrDefaultAsync();
            return _mapper.Map<DepartmentDto>(department);
        }

        public async Task<List<DepartmentDto>> GetDepartmentListAsync()
        {
            var departmentList = await _context.Set<Department>().ToListAsync();
            return _mapper.Map<List<DepartmentDto>>(departmentList);
        }

        public async Task<Guid> SaveDepartmentAsync(DepartmentDto model)
        {
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

            department.OrganizationId = model.OrganizationId;
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