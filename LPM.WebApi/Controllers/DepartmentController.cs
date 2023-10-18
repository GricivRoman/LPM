using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LPM.WebApi.Controllers
{
    [Route("/department")]
    [Authorize]
    public class DepartmentController : BaseController
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetDepartment(Guid id)
        {
            var department = await _departmentService.GetDepartmentAsync(id);
            return Ok(department);
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetOrganizationList()
        {
            var departmentList = await _departmentService.GetDepartmentListAsync();
            return Ok(departmentList);
        }

        [HttpPost]
        [HttpPatch]
        [Route("")]
        public async Task<IActionResult> SaveOrganization([FromBody]DepartmentDto model)
        {
            var createdDepartmentId = await _departmentService.SaveDepartmentAsync(model);
            return Ok(createdDepartmentId);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteOrganization(Guid id)
        {
            await _departmentService.DeleteDepartmentAsync(id);
            return Ok();
        }
    }
}
