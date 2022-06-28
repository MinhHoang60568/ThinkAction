using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using HomePage.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HomePage.Controllers
{
    public class DigitalMarketingController : Controller
    {
        private readonly ILogger<DigitalMarketingController> _logger;

        public DigitalMarketingController(
            ILogger<DigitalMarketingController> logger
        )
        {
            _logger = logger;
        }

        [Route("digital-marketing")]
        public IActionResult DigitalMarketing()
        {
            return View();
        }

        [
            ResponseCache(
                Duration = 0,
                Location = ResponseCacheLocation.None,
                NoStore = true)
        ]
        public IActionResult Error()
        {
            return View(new ErrorViewModel {
                RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier
            });
        }
    }
}
