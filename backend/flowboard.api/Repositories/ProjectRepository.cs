using flowboard.api.Data;
using flowboard.api.Models;

namespace flowboard.api.Repositories
{
    public class ProjectRepository : BaseRepository<Project>
    {
        public ProjectRepository(AppDbContext context) : base(context)
        {
        }
    }
}
