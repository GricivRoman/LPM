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
            var relative = await _context.Set<Relative>()
                .Where(x => x.Id == relativeId)
                .Include(x => x.Employees)
                .SingleOrDefaultAsync();

            return _mapper.Map<RelativeDto>(relative);
        }

        public async Task<List<RelativeDto>> GetEmployeeRelativesAsync(RelativeQueryFilter filter)
        {
            var employeeRelatives = await _context.Set<Relative>()
                .Where(x => x.Employees.Select(i => i.Id).Any(u => u == filter.EmployeeId))
                .PagedBy(filter.Paging)
                .ToListAsync();

            var relativeDto = _mapper.Map<List<RelativeDto>>(employeeRelatives);
            relativeDto.Select(x => x.EmployeeId = filter.EmployeeId).ToList();

            return relativeDto;
        }

        public async Task<Guid> SaveRelativeAsync(RelativeDto model)
        {
            Relative relative;
            if (model.Id != null)
            {
                relative = await _context.Set<Relative>()
                    .Include(x => x.Employees)
                    .Where(x => x.Id == model.Id)
                    .SingleOrDefaultAsync();
            }
            else
            {
                relative = new Relative
                {
                    Id = Guid.NewGuid()
                };

                _context.Set<Relative>().Add(relative);
            }

            relative.Sex = (SexEnum)model.Sex.Id;
            relative.IsCripple = model.IsCripple;
            relative.IsPreSchoolkid = model.IsPreSchoolkid;
            relative.BirthDate = model.BirthDate;
            relative.Name = model.Name;
            relative.RelativeKind = model.RelativeKind;

            if (relative.Employees == null || !relative.Employees.Any(x => x.Id == model.EmployeeId))
            {
                if (relative.Employees == null)
                    relative.Employees = new List<Employee>();

                var relativeEmployee = await _context.Set<Employee>().Where(x => x.Id == model.EmployeeId).FirstOrDefaultAsync();

                if(relativeEmployee != null)
                {
                    relative.Employees.Add(relativeEmployee);
                }
                else
                {
                    throw new ApplicationException("Invalid employee Id");
                }
            }                

            await _context.SaveChangesAsync();

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
