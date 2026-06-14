using flowboard.api.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace flowboard.api.DTOs
{
    public class ProjectDTO
    {
        public Guid? Id { get; set; }
        public string? Name { get; set; } = null!;
        public string? Description { get; set; }
        public string? Status { get; set; }

    }

    public class ProjectResponseDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public string Status { get; set; } = "";
    }
}
