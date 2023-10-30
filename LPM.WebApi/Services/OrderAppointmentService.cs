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
    public class OrderAppointmentService : IOrderAppointmentService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public OrderAppointmentService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<OrderAppointmentDto> GetOrderAppointmentAsync(Guid id)
        {
            var orderAppointment = await GetOrderAppointmentById(id);
            return _mapper.Map<OrderAppointmentDto>(orderAppointment);
        }

        public async Task<List<OrderAppointmentDto>> GetOrderAppointmentListAsync(OrderAppointmentQueryFilter filter)
        {
            var orderAppointmentList = await _context.Set<OrderAppointment>()
                .Include(x => x.Department)
                .ThenInclude(x => x.Organizadion)
                .Where(x => x.EmployeeId == filter.EmployeeId)
                .PagedBy(filter.Paging)
                .ToListAsync();

            return _mapper.Map<List<OrderAppointmentDto>>(orderAppointmentList);
        }

        public async Task<List<SelectItemDto<Guid>>> GetOrderAppointmentSelectItemListAsync(OrderAppointmentQueryFilter filter)
        {
            var orderAppointmentSelctList = await _context.Set<OrderAppointment>()
                .Where(x => x.EmployeeId == filter.EmployeeId)
                .PagedBy(filter.Paging)
                .Select(x => new SelectItemDto<Guid>
                {
                    Id= x.Id,
                    Value = x.Position + " " + x.OficialDateStart.Value.ToShortDateString(),
                })
                .ToListAsync();

            return orderAppointmentSelctList;
        }

        public async Task<Guid> SaveOrderAppointmentAsync(OrderAppointmentDto model)
        {
            OrderAppointment orderAppointment;
            if(model.Id != null)
            {
                orderAppointment = await GetOrderAppointmentById((Guid)model.Id);
            }
            else
            {
                orderAppointment = new OrderAppointment
                {
                    Id = new Guid(),
                    EmployeeId = model.EmployeeId
                };
                _context.Set<OrderAppointment>().Add(orderAppointment);
            }

            orderAppointment.DateStart = model.DateStart;
            orderAppointment.OficialDateStart = model.OficialDateStart;
            orderAppointment.DateEnd = model.DateEnd;
            orderAppointment.ProbationEndDate = model.ProbationEndDate;
            orderAppointment.DepartmentId = model.Department.Id;
            orderAppointment.EmployeeType = (EmployeeTypeEnum)model.EmployeeType.Id;
            orderAppointment.Position = model.Position;

            await _context.SaveChangesAsync();

            return orderAppointment.Id;
        }

        public async Task DeleteOrderAppointmentAsync(Guid id)
        {
            var orderAppointment = await GetOrderAppointmentById(id);
            _context.Set<OrderAppointment>().Remove(orderAppointment);

            await _context.SaveChangesAsync();
        }

        private async Task<OrderAppointment> GetOrderAppointmentById(Guid id)
        {
            var orderAppointment = await _context.Set<OrderAppointment>().Where(x => x.Id == id)
                .Include(x => x.Department)
                .ThenInclude(x => x.Organizadion)
                .SingleOrDefaultAsync();

            if (orderAppointment == null)
            {
                throw new ApplicationException("Приказа о назначении с данным ID не существует");
            }
            return orderAppointment;
        }
    }
}
