using flowboard.api.Data;
using flowboard.api.Models;
using Microsoft.EntityFrameworkCore;

namespace flowboard.api.Repositories
{
    public class BaseRepository<T> : IRepository<T> where T : BaseModel
    {
        protected readonly AppDbContext _context;
        protected readonly DbSet<T> _dbSet;

        public BaseRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _dbSet.Where(x => !x.IsDeleted).ToListAsync();
        }

        public async Task<T?> GetByIdAsync(Guid id)
        {
            return await _dbSet.SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
        }

        public async Task<T> CreateAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<T> UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await _dbSet.SingleOrDefaultAsync(x => x.Id ==id && !x.IsDeleted);

            if (entity == null) return false;

            entity.IsDeleted = true;
            entity.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
