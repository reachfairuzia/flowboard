using flowboard.api.Data;
using Microsoft.EntityFrameworkCore;

namespace flowboard.api.Repositories
{
    public class DashboardRepository
    {
        protected readonly AppDbContext _context;
        public DashboardRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetTotalUserAsync()
        {
            return await _context.Users.CountAsync(x => !x.IsDeleted);
        }
        public async Task<int> GetTotalProjectAsync()
        {
            return await _context.Projects.CountAsync(x => !x.IsDeleted);
        }
        public async Task<int> GetTotalProjectByStatusAsync(string status)
        {
            return await _context.Projects.CountAsync(x => x.Status == status && !x.IsDeleted);
        }
    }
}
