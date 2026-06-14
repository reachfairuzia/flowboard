using flowboard.api.Models;
using Microsoft.EntityFrameworkCore;

namespace flowboard.api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects{ get; set; }
    }
}
