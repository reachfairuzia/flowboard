using flowboard.api.DTOs;
using flowboard.api.Services;
using Microsoft.AspNetCore.Mvc;

namespace flowboard.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectService _projectService;
        public ProjectController(ProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _projectService.GetAllAsync();
            return StatusCode(data.StatusCode, data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(Guid id)
        {
            var data = await _projectService.GetByIdAsync(id);
            return StatusCode(data.StatusCode, data);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject(ProjectDTO project)
        {
            var data = await _projectService.AddAsync(project);
            return StatusCode(data.StatusCode, data);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProject(ProjectDTO project)
        {
            var data = await _projectService.UpdateAsync(project);
            return StatusCode(data.StatusCode, data);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(Guid id)
        {
            var data = await _projectService.DeleteAsync(id);
            return StatusCode(data.StatusCode, data);
        }
    }
}
