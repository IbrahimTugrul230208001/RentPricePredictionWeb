using Microsoft.AspNetCore.Mvc;
using RentPricePredictionWeb.Models;

namespace RentPricePredictionWeb.Controllers
{
    public class PredictionPageController : Controller
    {
        public IActionResult PredictionPage()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Predict(House house)
        {
            return Json(..);
        }
    }
}
