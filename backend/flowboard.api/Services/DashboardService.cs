using flowboard.api.DTOs;
using flowboard.api.Helper;
using flowboard.api.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;

namespace flowboard.api.Services
{
    public class DashboardService
    {
        private readonly DashboardRepository _dashboardRepo;
        public DashboardService(DashboardRepository dashboardRepo)
        {
            _dashboardRepo = dashboardRepo;
        }

        public async Task<ResponseHelper<DashboardDTO>> GetSummaryAsync()
        {
            try
            {
                var data = new DashboardDTO
                {
                    TotalUsers = await _dashboardRepo.GetTotalUserAsync(),
                    TotalProjects = await _dashboardRepo.GetTotalProjectAsync(),
                    ToDoProjects = await _dashboardRepo.GetTotalProjectByStatusAsync("To Do"),
                    InProgressProjects = await _dashboardRepo.GetTotalProjectByStatusAsync("In Progress"),
                    ReadyToTestProjects = await _dashboardRepo.GetTotalProjectByStatusAsync("Ready To Test"),
                    DoneProjects = await _dashboardRepo.GetTotalProjectByStatusAsync("Done")
                };

                return Response.Ok(data);
            }
            catch (Exception)
            {
                return Response.Error<DashboardDTO>();
            }
        }
    }
}
