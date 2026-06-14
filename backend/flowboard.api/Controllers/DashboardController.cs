using flowboard.api.Services;
using Microsoft.AspNetCore.Mvc;

namespace flowboard.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        protected readonly DashboardService _dashboardService;
        public DashboardController(DashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSummary()
        {
            var data = await _dashboardService.GetSummaryAsync();
            return StatusCode(data.StatusCode, data);
        }
    }
}
