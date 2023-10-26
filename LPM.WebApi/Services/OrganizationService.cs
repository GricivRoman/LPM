﻿using AutoMapper;
using LPM.Database;
using LPM.Database.Models;
using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Extensions;
using LPM.Infrastructure.Filters;
using LPM.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LPM.WebApi.Services
{
    public class OrganizationService : IOrganizationService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public OrganizationService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<OrganizationDto> GetOrganizationAsync(Guid id)
        {
            var organivation = await _context.Set<Organizadion>().Where(x => x.Id == id).SingleOrDefaultAsync();
            return _mapper.Map<OrganizationDto>(organivation);
        }

        public async Task<List<OrganizationDto>> GetOrganizationListAsync(OrganizationQueryFilter query)
        {
            var organizationListQuery = _context.Set<Organizadion>()
                .Include(x => x.Users)
                .Where(x => x.Users.Any(i => i.Id == query.UserId))
                .Include(x => x.Departments)
                .ThenInclude(x => x.OrderAppointments)
                .AsQueryable();

            if (query.TakeOnlyMainOrganization)
            {
                organizationListQuery = organizationListQuery.Where(x => x.IsMainOrganization);
            }

            var organizationList = await organizationListQuery.PagedBy(query.Paging).ToListAsync();

            return _mapper.Map<List<OrganizationDto>>(organizationList)
                    .Map(x => x.EmployeesNumber = CountEmployeesOfOrganization(x))
                    .ToList();
        }

        public async Task<List<SelectItemDto<Guid>>> GetOrganizationSelectItemList(OrganizationQueryFilter query)
        {
            var selectQuery = _context.Set<Organizadion>()                
                .Include(x => x.Users)
                .Where(x => x.Users.Any(i => i.Id == query.UserId))
                .AsQueryable();

            if (query.TakeOnlyMainOrganization)
            {
                selectQuery = selectQuery.Where(x => x.IsMainOrganization);
            }

            var selectList = await selectQuery
                .PagedBy(query.Paging)
                .Select(x => new SelectItemDto<Guid>
                {
                    Id = x.Id,
                    Value = x.ShortName
                })
                .ToListAsync();

            return selectList;
        }

        public async Task<Guid> SaveOrganizationAsync(OrganizationDto model, Guid userId)
        {
            
            Organizadion organization;

            if (model.Id.HasValue)
            {
                organization = await _context.Set<Organizadion>().Where(x => x.Id == model.Id).SingleOrDefaultAsync();
            }
            else
            {
                var user = await _context.Set<User>().Where(x => x.Id == userId).SingleOrDefaultAsync();
                organization = new Organizadion()
                {
                    Id = new Guid(),
                    Users = new List<User>()
                    
                };
                _context.Add(organization);
                organization.Users.Add(user);
            }

            organization.Name = model.Name;
            organization.ShortName = model.ShortName;
            organization.CreationDate = model.CreationDate;

            if (model.IsMainOrganization)
            {
                var previousMainOrg = await _context.Set<Organizadion>().Where(x => x.IsMainOrganization).SingleOrDefaultAsync();
                if(previousMainOrg != null)
                {
                    previousMainOrg.IsMainOrganization = false;
                }
            }
            organization.IsMainOrganization = model.IsMainOrganization;

            await _context.SaveChangesAsync();

            return organization.Id;
        }

        public async Task DeleteOrganizationAsync(Guid id)
        {
            var employeesNumber = await _context.Set<OrderAppointment>()
                .Where(x => x.Department.OrganizationId == id)
                .Select(x => x.EmployeeId)
                .CountAsync();

            if(employeesNumber > 0)
            {
                throw new ApplicationException("Невозможно удалить организацию с действующими сотрудниками");
            }

            var organization = await _context.Set<Organizadion>()
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();

            _context.Remove(organization);

            await _context.SaveChangesAsync();
        }

        private int CountEmployeesOfOrganization(OrganizationDto org)
        {
            var appointmentsList = new List<OrderAppointmentDto>();

            var appointmentsCollections = org.Departments.Select(x => x.OrderAppointments);
            foreach(var collection in appointmentsCollections)
            {
                appointmentsList.Union(collection);
            }

            var employeesNumber = appointmentsList.Where(x => x.DateEnd != null).DistinctBy(x => x.EmployeeId).Count();

            return employeesNumber;
        }
    }
}
