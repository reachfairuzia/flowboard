using flowboard.api.DTOs;
using flowboard.api.Services;
using Microsoft.AspNetCore.Mvc;

namespace flowboard.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _userService.GetAllAsync();
            return StatusCode(data.StatusCode, data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var data = await _userService.GetByIdAsync(id);
            return StatusCode(data.StatusCode, data);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(UserDTO user)
        {
            var data = await _userService.AddAsync(user);
            return StatusCode(data.StatusCode, data);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser(UserDTO user)
        {
            var data = await _userService.UpdateAsync(user);
            return StatusCode(data.StatusCode, data);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var data = await _userService.DeleteAsync(id);
            return StatusCode(data.StatusCode, data);
        }
    }
}
