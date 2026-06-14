using flowboard.api.Data;
using flowboard.api.Models;

namespace flowboard.api.Repositories
{
    public class UserRepository : BaseRepository<User>
    {
        public UserRepository(AppDbContext context) : base(context) 
        { 
        }
    }
}
