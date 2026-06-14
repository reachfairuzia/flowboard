namespace flowboard.api.Models
{
    public class User : BaseModel
    {
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Bio { get; set; }
        public string? AvatarUrl { get; set; }
    }
}
