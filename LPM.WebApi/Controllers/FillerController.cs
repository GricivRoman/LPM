using LPM.Database.Models;
using LPM.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LPM.WebApi.Controllers
{
    [Route("/primarily-filler")]
    [Authorize]
    public class FillerController : BaseController
    {
        private readonly IFillerService _fillerService;
        private readonly UserManager<User> _userManager;

        public FillerController(IFillerService fillerService, UserManager<User> userManager)
        {
            _fillerService = fillerService;
            _userManager = userManager;
        }
        public async Task<IActionResult> FillBDByExcelFile([FromForm] IFormFile file)
        {
            var currentUserId = (await _userManager.FindByNameAsync(User.Identity.Name)).Id;
            await _fillerService.FillDBByExcelAsync(file, currentUserId);
            return Ok();
        }
    }
}
