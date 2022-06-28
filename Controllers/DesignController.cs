using HomePage.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace HomePage.Controllers
{
    public class DesignController : Controller
    {
        private readonly ILogger<DesignController> _logger;

        public DesignController(ILogger<DesignController> logger)
        {
            _logger = logger;
        }

        [Route("thiet-ke-thuong-hieu")]
        public IActionResult Design()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
