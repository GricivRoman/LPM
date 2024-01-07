using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Filters;
using LPM.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LPM.WebApi.Controllers
{
    [Route("/relative")]
    [Authorize]
    public class RelativeController : BaseController
    {
        private readonly IRelativeService _relativeService;

        public RelativeController(IRelativeService relativeService)
        {
            _relativeService = relativeService;
        }

        [HttpGet]
        [Route("{relativeId}")]
        public async Task<IActionResult> GetRelative(Guid relativeId)
        {
            var relative = await _relativeService.GetRelativeAsync(relativeId);
            return Ok(relative);
        }

        [HttpGet]
        [Route("employee-list")]
        public async Task<IActionResult> GetEmployeeRelatives([FromQuery] RelativeQueryFilter filter)
        {
            var relatives = await _relativeService.GetEmployeeRelativesAsync(filter);
            return Ok(relatives);
        }

        [HttpPost]
        [HttpPatch]
        [Route("employee")]
        public async Task<IActionResult> SaveRelative(RelativeDto model)
        {
            await _relativeService.SaveRelativeAsync(model);
            return Ok();
        }

        [HttpDelete]
        [Route("employee/{relativeId}")]
        public async Task<IActionResult> DeleteRelative(Guid relativeId)
        {
            await _relativeService.DeleteRelativeAsync(relativeId);
            return Ok();
        }
    }
}
