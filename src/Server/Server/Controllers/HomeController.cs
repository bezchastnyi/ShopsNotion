using System.Reflection;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Controller]
    [Route("/[controller]/[action]")]
    public class HomeController : Controller
    {
        [HttpGet]
        [Route("")]
        [Route("/")]
        public IActionResult Home()
        {
            var info = $"{Assembly.GetEntryAssembly().GetName().Name}: " +
                       $"{Assembly.GetEntryAssembly().GetCustomAttribute<AssemblyInformationalVersionAttribute>()?.InformationalVersion}";
            return this.Ok(info);
        }
    }
}