using LPM.Database.Models;
using LPM.Infrastructure.Dto;
using LPM.Infrastructure.Filters;
using LPM.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LPM.WebApi.Controllers
{
    [Route("/organization")]
    [Authorize]
    public class OrganizationController : BaseController
    {
        private readonly IOrganizationService _organizationService;
        private readonly UserManager<User> _userManager;

        public OrganizationController(IOrganizationService organizationService, UserManager<User> userManager)
        {
            _organizationService = organizationService;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetOrganization(Guid id)
        {
            var organization = await _organizationService.GetOrganizationAsync(id);
            return Ok(organization);
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetOrganizationList([FromQuery] OrganizationQueryFilter query)
        {
            var organizationList = await _organizationService.GetOrganizationListAsync(query);
            return Ok(organizationList);
        }

        [HttpGet]
        [Route("select-list")]
        public async Task<IActionResult> GetOrganizationSelectItemList([FromQuery] OrganizationQueryFilter query)
        {
            var selectList = await _organizationService.GetOrganizationSelectItemList(query);
            return Ok(selectList);
        }

        [HttpPost]
        [HttpPatch]
        [Route("")]
        public async Task<IActionResult> SaveOrganization([FromBody]OrganizationDto model)
        {
            var currentUserId = (await _userManager.FindByNameAsync(User.Identity.Name)).Id;
            var createdOrganizationId = await _organizationService.SaveOrganizationAsync(model, currentUserId);
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
