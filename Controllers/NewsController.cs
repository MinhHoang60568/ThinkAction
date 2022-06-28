using HomePage.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace HomePage.Controllers
{
    public class NewsController : Controller
    {
        private readonly ILogger<NewsController> _logger;

        public NewsController(ILogger<NewsController> logger)
        {
            _logger = logger;
        }

        [Route("tin-tuc")]
        public IActionResult News(string tags)
        {
            if (!string.IsNullOrEmpty(tags))
            {
                return View($"~/Views/News/NewsByTag.cshtml");
            }
            return View();
        }

        [Route("chi-tiet-tin-tuc")]
        public IActionResult NewsDetail(string id)
        {
            var client = new RestClient($"https://cms.thinkaction.vn/homepage-chi-tiet-tin-tuc?articleId={id}");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);
            //Console.WriteLine(response.Content);
            var result = JsonConvert.DeserializeObject<RootNews>(response.Content);
            ViewBag.Title = result.newsDetail.Title.ToString();
            ViewBag.SummaryContent = result.newsDetail.SummaryContent;
            ViewBag.Link = "https://thinkaction.vn/chi-tiet-tin-tuc?slug=" + result.newsDetail.Slug + "&id=" + result.newsDetail.ArticleId;
            ViewBag.Image = "https://cms.thinkaction.vn/" + result.newsDetail.Thumbnail;
            return View($"~/Views/News/NewsDetail.cshtml");
        }

        [Route("preview-chi-tiet-tin-tuc")]
        public IActionResult PreviewNewsDetail(string id)
        {
            var client = new RestClient($"https://cms.thinkaction.vn/homepage-chi-tiet-tin-tuc?articleId={id}");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);
            //Console.WriteLine(response.Content);
            var result = JsonConvert.DeserializeObject<RootNews>(response.Content);
            ViewBag.Title = result.newsDetail.Title.ToString();
            ViewBag.SummaryContent = result.newsDetail.SummaryContent;
            ViewBag.Link = "https://thinkaction.vn/chi-tiet-tin-tuc?slug=" + result.newsDetail.Slug + "&id=" + result.newsDetail.ArticleId;
            ViewBag.Image = "https://cms.thinkaction.vn/" + result.newsDetail.Thumbnail;
            return View($"~/Views/News/NewsDetail.cshtml");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
