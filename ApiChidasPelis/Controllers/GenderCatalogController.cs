using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiChidasPelis.Data;
using ApiChidasPelis.Models;
using ApiChidasPelis.Dtos;

namespace ApiChidasPelis.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenderCatalogController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GenderCatalogController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/gendercatalog
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenderCatalog>>> GetAll()
        {
            return await _context.GenderCatalogs.ToListAsync();
        }

        // PUT: api/gendercatalog/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] GenderCatalogUpdateDto dto)
        {
            var gender = await _context.GenderCatalogs.FindAsync(id);
            if (gender == null)
                return NotFound();

            gender.Name = dto.Name;
            gender.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/gendercatalog
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] GenderCatalogCreateDto dto)
        {
            var gender = new GenderCatalog
            {
                Name = dto.Name,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _context.GenderCatalogs.Add(gender);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = gender.IdGender }, gender);
        }
    }
}
