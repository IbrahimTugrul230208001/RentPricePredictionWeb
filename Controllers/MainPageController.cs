using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class MainPageController : Controller
    {
        public IActionResult MainPage()
        {
            return View();
        }
    }
}
