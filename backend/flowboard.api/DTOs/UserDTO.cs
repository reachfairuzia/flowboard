using System.Text.Json.Serialization;

namespace flowboard.api.DTOs
{
    public class UserDTO
    {
        public Guid? Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Bio { get; set; }

        [JsonPropertyName("avatar_url")]
        public string? AvatarUrl { get; set; }
    }

    public class UserResponseDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string? Bio { get; set; }
        public string? AvatarUrl { get; set; }
    }
}
