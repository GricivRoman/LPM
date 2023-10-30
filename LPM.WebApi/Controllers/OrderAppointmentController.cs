using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Filters;
using LPM.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LPM.WebApi.Controllers
{
    [Route("order-appointment")]
    [Authorize]
    public class OrderAppointmentController : BaseController
    {
        private readonly IOrderAppointmentService _orderAppointmentService;

        public OrderAppointmentController(IOrderAppointmentService orderAppointmentService)
        {
            _orderAppointmentService = orderAppointmentService;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetOrderAppointment(Guid id)
        {
            var orderAppointment = await _orderAppointmentService.GetOrderAppointmentAsync(id);
            return Ok(orderAppointment);
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetOrderAppointmentList([FromQuery] OrderAppointmentQueryFilter filter)
        {
            var orderAppointmentsList = await _orderAppointmentService.GetOrderAppointmentListAsync(filter);
            return Ok(orderAppointmentsList);
        }

        [HttpGet]
        [Route("select-list")]
        public async Task<IActionResult> GetOrderAppointmentSelectItemList([FromQuery] OrderAppointmentQueryFilter filter)
        {
            var orderAppointmentSelectList = await _orderAppointmentService.GetOrderAppointmentSelectItemListAsync(filter);
            return Ok(orderAppointmentSelectList);
        }

        [HttpPost]
        [HttpPatch]
        [Route("")]
        public async Task<IActionResult> SaveOrderAppointment([FromBody] OrderAppointmentDto model)
        {
            var savedOrderAppointmentId = await _orderAppointmentService.SaveOrderAppointmentAsync(model);
            return Ok(savedOrderAppointmentId);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteOrderAppointment(Guid id)
        {
            await _orderAppointmentService.DeleteOrderAppointmentAsync(id);
            return Ok();
        }
    }
}
