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
    public class RelativeService : IRelativeService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public RelativeService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<RelativeDto> GetRelativeAsync(Guid relativeId)
        {
            var relative = await _context.Set<Relative>().Where(x => x.Id == relativeId).SingleOrDefaultAsync();
            return _mapper.Map<RelativeDto>(relative);
        }

        public async Task<List<RelativeDto>> GetEmployeeRelativesAsync(RelativeQueryFilter filter)
        {
            var employeeRelatives = await _context.Set<Relative>()
                .Where(x => filter.EmployeeIdList.Contains(x.Id))
                .PagedBy(filter.Paging)
                .ToListAsync();

            return _mapper.Map<List<RelativeDto>>(employeeRelatives);
        }

        public async Task<Guid> SaveRelativeAsync(RelativeDto model)
        {
            Relative relative;
            if (model.Id != null)
            {
                relative = await _context.Set<Relative>().Where(x => x.Id == model.Id).SingleOrDefaultAsync();
            }
            else
            {
                relative = new Relative
                {
                    Id = Guid.NewGuid()
                };
            }

            relative.Sex = (SexEnum)model.Sex.Id;
            relative.IsCripple = model.IsCripple;
            relative.IsPreSchoolkid = model.IsPreSchoolkid;
            relative.BirthDate = model.BirthDate;
            relative.Name = model.Name;
            relative.RelativeKind = model.RelativeKind;


            if(model.Employees.Count > 0)
            {
                relative.Employees = await _context.Set<Employee>()
                    .Where(x => model.Employees
                    .Select(i => i.Id).Contains(x.Id))
                    .ToListAsync();
            }
            else
            {
                if(relative.Employees.Count > 0)
                {
                    relative.Employees = new List<Employee>();
                }
            }

            return relative.Id;
        }

        public async Task DeleteRelativeAsync(Guid relativeId)
        {
            var relative = await _context.Set<Relative>().Where(x => x.Id == relativeId).SingleOrDefaultAsync();
            _context.Set<Relative>().Remove(relative);

            await _context.SaveChangesAsync();
        }
    }
}
