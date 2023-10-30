using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Filters;

namespace LPM.Infrastructure.Interfaces
{
    public interface IOrderAppointmentService
    {
        Task<OrderAppointmentDto> GetOrderAppointmentAsync(Guid id);

        Task<List<OrderAppointmentDto>> GetOrderAppointmentListAsync(OrderAppointmentQueryFilter filter);

        Task<List<SelectItemDto<Guid>>> GetOrderAppointmentSelectItemListAsync(OrderAppointmentQueryFilter filter);

        Task<Guid> SaveOrderAppointmentAsync(OrderAppointmentDto model);

        Task DeleteOrderAppointmentAsync(Guid id);
    }
}
