using flowboard.api.Data;
using flowboard.api.DTOs;
using flowboard.api.Helper;
using flowboard.api.Models;
using flowboard.api.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;

namespace flowboard.api.Services
{
    public class ProjectService
    {
        private readonly IRepository<Project> _projectRepo;

        public ProjectService(IRepository<Project> projectRepository)
        {
            _projectRepo = projectRepository;
        }

        public async Task<ResponseHelper<List<Project>>> GetAllAsync()
        {
            var project = await _projectRepo.GetAllAsync();
            return Response.Ok(project);
        }

        public async Task<ResponseHelper<Project>> GetByIdAsync(Guid id)
        {
            try
            {
                var project = await _projectRepo.GetByIdAsync(id);
                if (project == null)
                {
                    return Response.NotFound<Project>();
                }

                return Response.Ok(project);
            }
            catch (Exception)
            {
                return Response.Error<Project>();
            }
        }

        public async Task<ResponseHelper<ProjectResponseDTO>> AddAsync(ProjectDTO project)
        {
            try
            {
                var entity = new Project()
                {
                    Name = project.Name,
                    Description = project.Description,
                    Status = "To Do"
                };

                await _projectRepo.CreateAsync(entity);

                return Response.Ok(new ProjectResponseDTO
                {
                    Id = entity.Id,
                    Name = entity.Name,
                    Description = entity.Description ?? "",
                    Status = entity.Status
                });
            }
            catch (Exception)
            {
                return Response.Error<ProjectResponseDTO>();
            }
        }

        public async Task<ResponseHelper<ProjectResponseDTO>> UpdateAsync(ProjectDTO project)
        {
            try
            {
                if (project.Id == null)
                    return Response.BadRequest<ProjectResponseDTO>("Id is required");

                var entity = await _projectRepo.GetByIdAsync(project.Id.Value);
                if (entity == null)
                    return Response.NotFound<ProjectResponseDTO>();

                entity.Name = project.Name ?? entity.Name;
                entity.Description = project.Description;
                entity.UpdatedAt = DateTime.UtcNow;
                entity.Status = project.Status ?? entity.Status;

                await _projectRepo.UpdateAsync(entity);

                return Response.Ok(new ProjectResponseDTO
                {
                    Id = entity.Id,
                    Name = entity.Name,
                    Description = entity.Description ?? "",
                    Status = entity.Status
                });
            }
            catch (Exception)
            {
                return Response.Error<ProjectResponseDTO>();
            }
        }

        public async Task<ResponseHelper<bool>> DeleteAsync(Guid id)
        {
            try
            {
                var deleted = await _projectRepo.DeleteAsync(id);
                if (!deleted)
                    return Response.NotFound<bool>("Project Not Found");

                return Response.Ok<bool>(true, "Project deleted successfully");
            }
            catch (Exception)
            {
                return Response.Error<bool>();
            }
        }
    }
}
