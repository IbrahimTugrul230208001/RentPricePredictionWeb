using Microsoft.AspNetCore.Mvc;

namespace RentPricePredictionWeb.Controllers
{
    public class PredictionController : Controller
    {
        public IActionResult Prediction()
        {
            return View();
        }
    }
}
