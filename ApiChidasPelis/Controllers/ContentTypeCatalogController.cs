using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiChidasPelis.Data;
using ApiChidasPelis.Dtos;
using ApiChidasPelis.Models;

namespace ApiChidasPelis.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContentTypeCatalogController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContentTypeCatalogController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/contenttypecatalog
// GET: api/contenttypecatalog/{id}
      [HttpGet("{id}")]
      public async Task<ActionResult<ContentTypeCatalogReadDto>> GetById(int id)
      {
          var tipo = await _context.ContentTypeCatalogs.FindAsync(id);

          if (tipo == null)
              return NotFound();

          var dto = new ContentTypeCatalogReadDto
          {
              IdContentType = tipo.IdContentType,
              Name = tipo.Name
          };

          return Ok(dto);
      }

    }
}
