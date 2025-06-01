// 📁 UsersController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ApiChidasPelis.Data;
using ApiChidasPelis.Models;
using ApiChidasPelis.Services;

namespace ApiChidasPelis.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ LOGIN: Generar token JWT si las credenciales son correctas
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request, [FromServices] JwtService jwtService)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !user.CheckPassword(request.Password))
                return Unauthorized("Credenciales incorrectas.");

            var token = jwtService.GenerateToken(user);

            return Ok(new
            {
                token,
                user = new
                {
                    user.UserId,
                    user.FirstName,
                    user.LastName,
                    user.Email
                }
            });
        }

        // ✅ PROTECTED PROFILE: Requiere token JWT válido
        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return NotFound();

            return Ok(new
            {
                user.UserId,
                user.FirstName,
                user.LastName,
                user.Email
            });
        }

        // ✅ REGISTER: api/users/register
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] CreateUserRequest request, [FromServices] JwtService jwtService)
        {
            try
            {
                bool userExists = await _context.Users.AnyAsync(u => u.Email == request.Email);
                if (userExists)
                {
                    return Conflict(new { message = "Este correo ya está registrado." });
                }

                var user = new User
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    CreatedAt = DateTime.Now,
                    UpdateAt = DateTime.Now
                };

                user.SetPassword(request.Password);

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                // ✅ Generar token después del registro
                var token = jwtService.GenerateToken(user);

                return Ok(new //Esta la respueste que devuelve cuando mi petecion se realiza con exito
                {
                    token,
                    user = new
                    {
                        user.UserId,
                        user.FirstName,
                        user.LastName,
                        user.Email
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error del servidor", details = ex.Message });
            }
        }



        // ✅ GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // ✅ GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            return user;
        }

        // ✅ DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
