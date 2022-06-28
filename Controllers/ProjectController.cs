using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using HomePage.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RestSharp;

namespace HomePage.Controllers
{
    public class ProjectController : Controller
    {
        private readonly ILogger<ProjectController> _logger;

        public ProjectController(ILogger<ProjectController> logger)
        {
            _logger = logger;
        }

        [Route("du-an")]
        public IActionResult Project()
        {
            return View();
        }

        [Route("chi-tiet-du-an")]
        public IActionResult ProjectDetail(string id)
        {
            var client = new RestClient($"https://cms.thinkaction.vn/homepage-chi-tiet-du-an?id={id}");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);
            //Console.WriteLine(response.Content);
            var result = JsonConvert.DeserializeObject<RootProject>(response.Content);
            ViewBag.Title = result.data.Name.ToString();
            ViewBag.SummaryContent = result.data.Description.ToString();
            ViewBag.Link = "https://thinkaction.vn/chi-tiet-tin-tuc?slug=" + result.data.Slug + "&id=" + result.data.ProductId;
            //var link = "https://thinkaction.vn/chi-tiet-du-an?slug=" + value.Slug + "&id=" + value.ProductId;
            ViewBag.Image = "https://cms.thinkaction.vn/" + result.data.Thumbnail;
            return View($"~/Views/Project/ProjectDetail.cshtml");
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
