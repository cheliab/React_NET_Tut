using Microsoft.AspNetCore.Mvc;

namespace ReactJS_NET_WebApp.Controllers
{
    public class HomeController : Controller
    {
        // GET
        public IActionResult Index()
        {
            return View();
        }
    }
}