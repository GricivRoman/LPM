using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LPM.WebApi.Controllers
{
    [Route("/organization")]
    [Authorize]
    public class OrganizationController : BaseController
    {
        private readonly IOrganizationService _organizationService;

        public OrganizationController(IOrganizationService organizationService)
        {
            _organizationService = organizationService;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetOrganization([FromRoute]Guid id)
        {
            var organization = await _organizationService.GetOrganizationAsync(id);
            return Ok(organization);
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetOrganizationList()
        {
            var organizationList = await _organizationService.GetOrganizationListAsync();
            return Ok(organizationList);
        }

        [HttpGet]
        [Route("select-list")]
        public async Task<IActionResult> GetOrganizationSelectItemList()
        {
            var selectList = await _organizationService.GetOrganizationSelectItemList();
            return Ok(selectList);
        }

        [HttpPost]
        [HttpPatch]
        [Route("")]
        public async Task<IActionResult> SaveOrganization([FromBody]OrganizationDto model)
        {
            var createdOrganizationId = await _organizationService.SaveOrganizationAsync(model);
            return Ok(createdOrganizationId);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteOrganization(Guid id)
        {
            await _organizationService.DeleteOrganizationAsync(id);
            return Ok();
        }
    }
}
