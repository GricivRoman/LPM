using LPM.WebApi.Validation;
using Microsoft.AspNetCore.Mvc;

namespace LPM.WebApi.Controllers
{
    [ServiceFilter(typeof(ValidationFilterAttribute))]
    public class BaseController : Controller
    {
    }
}
