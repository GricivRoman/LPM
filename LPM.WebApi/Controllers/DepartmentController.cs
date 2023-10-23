using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Filters;
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
        public async Task<IActionResult> GetDepartmentList([FromQuery]DepartmentQueryFilter query)
        {
            var departmentList = await _departmentService.GetDepartmentListAsync(query);
            return Ok(departmentList);
        }

        [HttpGet]
        [Route("select-list")]
        public async Task<IActionResult> GetDepartmentSelectItemList([FromQuery]DepartmentQueryFilter query)
        {
            var selectList = await _departmentService.GettDepartmentSelectItemList(query);
            return Ok(selectList);
        }

        [HttpPost]
        [HttpPatch]
        [Route("")]
        public async Task<IActionResult> SaveDepartment([FromBody]DepartmentDto model)
        {
            var createdDepartmentId = await _departmentService.SaveDepartmentAsync(model);
            return Ok(createdDepartmentId);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteDepartment(Guid id)
        {
            await _departmentService.DeleteDepartmentAsync(id);
            return Ok();
        }
    }
}
