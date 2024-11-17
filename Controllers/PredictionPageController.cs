using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RentPricePredictionWeb.Models;
using System.Diagnostics;
using System.Net;

namespace RentPricePredictionWeb.Controllers
{
    public class PredictionPageController : Controller
    {
        public IActionResult PredictionPage()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Predict([FromBody] House house)
        {
            // Serialize the user input to JSON
            string inputJson = JsonConvert.SerializeObject(house);

            // Path to the Python script
            string pythonScriptPath = @"C:\Users\ibrah\source\repos\WebApplication1\PythonScripts\model.py";

            var startInfo = new ProcessStartInfo
            {
                FileName = "python",
                Arguments = $"{pythonScriptPath} \"{inputJson}\"",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            try
            {
                // Execute the Python script
                using (var process = Process.Start(startInfo))
                {
                    if (process == null) return Json(new { success = false, message = "Failed to start the Python process." });

                    var output = process.StandardOutput.ReadToEnd();
                    var error = process.StandardError.ReadToEnd();

                    process.WaitForExit();

                    if (!string.IsNullOrWhiteSpace(error))
                        return Json(new { success = false, message = error });

                    // Parse the prediction result
                    var result = JsonConvert.DeserializeObject<dynamic>(output);
                    return Json(new { success = true, prediction = result.prediction });
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }

}

