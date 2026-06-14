using System.Runtime.CompilerServices;

namespace flowboard.api.Models
{
    public class Project : BaseModel
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string Status { get; set; } = null!;
    }
}
