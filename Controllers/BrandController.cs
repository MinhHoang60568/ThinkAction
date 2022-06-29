using HomePage.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RestSharp;
using System.Diagnostics;

namespace HomePage.Controllers
{
    public class BrandController : Controller
    {
        private readonly ILogger<BrandController> _logger;

        public BrandController(ILogger<BrandController> logger)
        {
            _logger = logger;
        }

        [Route("nhan-dien-thuong-hieu")]
        public IActionResult Brand()
        {
            // get services
            var client = new RestClient("https://cms.thinkaction.vn/homepage-dich-vu");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);
            //Console.WriteLine(response.Content);

            var result = JsonConvert.DeserializeObject<RootService>(response.Content);
            ViewBag.Data = result.data;


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
