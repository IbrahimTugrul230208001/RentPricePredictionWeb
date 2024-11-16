using Microsoft.AspNetCore.Mvc;
using RentPricePredictionWeb.Models;

namespace RentPricePredictionWeb.Controllers
{
    public class PredictionController : Controller
    {
        public IActionResult PredictionPage()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Prediction(House house)
        {
            return Json(..);
        }
    }
}
