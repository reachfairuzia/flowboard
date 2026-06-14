using flowboard.api.Data;
using flowboard.api.DTOs;
using flowboard.api.Helper;
using flowboard.api.Models;
using flowboard.api.Repositories;

namespace flowboard.api.Services
{
    public class UserService
    {
        private readonly IRepository<User> _userRepo;

        public UserService(IRepository<User> userRepository)
        {
            _userRepo = userRepository;
        }

        public async Task<ResponseHelper<List<User>>> GetAllAsync()
        {
            var data = await _userRepo.GetAllAsync();
            return Response.Ok(data);
        }

        public async Task<ResponseHelper<User>> GetByIdAsync(Guid id)
        {
            try
            {
                var user = await _userRepo.GetByIdAsync(id);
                if (user == null)
                {
                    return Response.NotFound<User>();
                }

                return Response.Ok(user);
            }
            catch (Exception)
            {
                return Response.Error<User>();
            }
            
        }

        public async Task<ResponseHelper<UserResponseDTO>> AddAsync(UserDTO user)
        {
            try
            {
                var entity = new User()
                {
                    Name = user.Name,
                    Email = user.Email,
                    Bio = user.Bio,
                    AvatarUrl = user.AvatarUrl
                };

                await _userRepo.CreateAsync(entity);

                return Response.Ok(new UserResponseDTO
                {
                    Id = entity.Id,
                    Name = entity.Name,
                    Bio = entity.Bio,
                    Email = entity.Email,
                    AvatarUrl = entity.AvatarUrl
                });
            }
            catch (Exception)
            {
                return Response.Error<UserResponseDTO>();
            }
        }

        public async Task<ResponseHelper<UserResponseDTO>> UpdateAsync(UserDTO user)
        {
            try
            {
                if (user.Id == null)
                    return Response.BadRequest<UserResponseDTO>("Id is Required");

                var entity = await _userRepo.GetByIdAsync(user.Id.Value);
                if (entity == null)
                    return Response.NotFound<UserResponseDTO>();

                entity.Name = user.Name;
                entity.Email = user.Email;
                entity.Bio = user.Bio;
                entity.AvatarUrl = user.AvatarUrl;
                entity.UpdatedAt = DateTime.UtcNow;

                await _userRepo.UpdateAsync(entity);

                return Response.Ok(new UserResponseDTO 
                { 
                    Id = entity.Id,
                    Name = entity.Name,
                    Bio = entity.Bio,
                    Email = entity.Email,
                    AvatarUrl = entity.AvatarUrl
                });
            }
            catch (Exception)
            {
                return Response.Error<UserResponseDTO>();
            }
        }

        public async Task<ResponseHelper<bool>> DeleteAsync(Guid id)
        {
            try
            {
                var deleted = await _userRepo.DeleteAsync(id);
                if (!deleted)
                    return Response.NotFound<bool>("User Not Found");

                return Response.Ok<bool>(true, "User deleted successfully");
            }
            catch (Exception)
            {
                return Response.Error<bool>();
            }
        }
    }
}
