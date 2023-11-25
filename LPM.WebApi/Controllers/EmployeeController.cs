using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Filters;
using LPM.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LPM.WebApi.Controllers
{
    [Route("/employee")]
    [Authorize]
    public class EmployeeController : BaseController
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetEmployee(Guid id)
        {
            var organization = await _employeeService.GetEmployeeAsync(id);
            return Ok(organization);
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetEmployeeList([FromQuery]EmployeeGridListFilter filter)
        {
            var organizationList = await _employeeService.GetEmployeeListAsync(filter);
            return Ok(organizationList);
        }

        [HttpGet]
        [Route("select-list")]
        public async Task<IActionResult> GetEmployeeSelectItemList([FromQuery]BaseEmployeeQueryFilter filter)
        {
            var selectList = await _employeeService.GetEmployeeSelectItemList(filter);
            return Ok(selectList);
        }

        [HttpPost]
        [HttpPatch]
        [Route("")]
        public async Task<IActionResult> SaveEmployee([FromBody] EmployeeDto model)
        {
            var createdOrganizationId = await _employeeService.SaveEmployeeAsync(model);
            return Ok(createdOrganizationId);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {
            await _employeeService.DeleteEmployeeAsync(id);
            return Ok();
        }
    }
}
