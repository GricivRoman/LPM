using LPM.Database;
using LPM.Database.Models;
using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Extensions;
using LPM.Infrastructure.Filters;
using LPM.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LPM.WebApi.Services
{
    public class PositionService : IPositionService
    {
        private readonly DataContext _context;

        public PositionService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<SelectItemDto<Guid>>> GettPositionSelectItemList(PagedQueryFilter filter)
        {
            var positionList = await _context.Set<OrderAppointment>()
                .Select(x => x.Position)
                .Distinct()
                .PagedBy(filter.Paging)
                .Select(x => new SelectItemDto<Guid> { Value = x})
                .ToListAsync();

            return positionList;
        }
    }
}
