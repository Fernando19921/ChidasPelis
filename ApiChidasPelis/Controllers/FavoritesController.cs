using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiChidasPelis.Data;
using ApiChidasPelis.Models;
using ApiChidasPelis.Dtos;
using AutoMapper;

namespace ApiChidasPelis.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public FavoritesController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // 🔍 Obtener todos los favoritos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FavoritesReadDto>>> GetAll()
        {
            var favs = await _context.Favorites
                .Include(f => f.User)
                .Include(f => f.Content)
                    .ThenInclude(c => c.Gender)
                .Include(f => f.Content)
                    .ThenInclude(c => c.ContentType)
                .ToListAsync();

            var dtos = favs.Select(f => new FavoritesReadDto
            {
                IdFavorite = f.IdFavorite,
                UserName = f.User?.FirstName + " " + f.User?.LastName ?? "",
                Name = f.Content?.Name ?? "",
                Img = f.Content?.Img ?? "",
                Director = f.Content?.Director ?? "",
                Time = f.Content?.Time ?? 0,
                Trailer = f.Content?.Trailer ?? "",
                ReleaseYear = f.Content?.ReleaseYear ?? 0,
                Description = f.Content?.Description ?? "",
                GenderName = f.Content?.Gender?.Name ?? "",
                ContentTypeName = f.Content?.ContentType?.Name ?? ""
            });

            return Ok(dtos);
        }

        // 📥 Crear un nuevo favorito
        [HttpPost]
          public async Task<ActionResult> Create(FavoritesCreateDto dto)
          {

             // Verifica si ya existe el favorito
            bool yaExiste = await _context.Favorites
              .AnyAsync(f => f.UserId == dto.UserId && f.ContentId == dto.ContentId);

            if (yaExiste)
            {
              return Conflict("Este contenido ya está en favoritos para este usuario.");
            }
            var favorite = _mapper.Map<Favorites>(dto);
            favorite.CreatedAt = DateTime.Now;
            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = favorite.IdFavorite }, favorite);
          }

        // 🔁 Actualizar un favorito existente
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, FavoritesCreateDto dto)
        {
            var favorite = await _context.Favorites.FindAsync(id);
            if (favorite == null)
                return NotFound();

            _mapper.Map(dto, favorite);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ❌ Eliminar un favorito
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var fav = await _context.Favorites.FindAsync(id);
            if (fav == null)
                return NotFound();

            _context.Favorites.Remove(fav);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // 👤 Obtener favoritos por usuario
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<FavoritesReadDto>>> GetByUser(int userId)
        {
            var favs = await _context.Favorites
                .Where(f => f.UserId == userId)
                .Include(f => f.User)
                .Include(f => f.Content)
                    .ThenInclude(c => c.Gender)
                .Include(f => f.Content)
                    .ThenInclude(c => c.ContentType)
                .ToListAsync();

            if (!favs.Any())
                return NotFound("Este usuario no tiene películas en favoritos.");

            var dtos = favs.Select(f => new FavoritesReadDto
            {
                IdFavorite = f.IdFavorite,
                UserName = f.User?.FirstName + " " + f.User?.LastName ?? "",
                Name = f.Content?.Name ?? "",
                Img = f.Content?.Img ?? "",
                Director = f.Content?.Director ?? "",
                Time = f.Content?.Time ?? 0,
                Trailer = f.Content?.Trailer ?? "",
                ReleaseYear = f.Content?.ReleaseYear ?? 0,
                Description = f.Content?.Description ?? "",
                GenderName = f.Content?.Gender?.Name ?? "",
                ContentTypeName = f.Content?.ContentType?.Name ?? ""
            });

            return Ok(dtos);
        }
    }
}
