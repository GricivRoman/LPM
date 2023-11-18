using LPM.Infrastructure.Filters;
using LPM.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LPM.WebApi.Controllers
{
    [Route("/position")]
    [Authorize]
    public class PositionController : BaseController
    {
        private readonly IPositionService _positionService;

        public PositionController(IPositionService positionService)
        {
            _positionService = positionService;
        }

        [HttpGet]
        [Route("select-list")]
        public async Task<IActionResult> GetPositionSelectItemList([FromQuery] PagedQueryFilter filter)
        {
            var selectList = await _positionService.GettPositionSelectItemList(filter);
            return Ok(selectList);
        }
    }
}
