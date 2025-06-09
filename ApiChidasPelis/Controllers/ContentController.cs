using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiChidasPelis.Models;
using ApiChidasPelis.Dtos;
using ApiChidasPelis.Data;
using AutoMapper;

namespace ApiChidasPelis.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ContentController : ControllerBase
  {
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public ContentController(AppDbContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    // GET: api/content
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ContentReadDto>>> GetAll()
    {
      var contents = await _context.Contents
          .Include(c => c.Gender)
          .Include(c => c.ContentType)
          .ToListAsync();

      var dtos = contents.Select(c => new ContentReadDto
      {
        ContentId = c.ContentId,
        Name = c.Name!,
        Img = c.Img,
        Rating = c.Rating,
        Director=c.Director,
        Time=c.Time,
        Trailer =c.Trailer,
        ReleaseYear = c.ReleaseYear,
        Description = c.Description,
        GenderName = c.Gender.Name,
        ContentTypeName = c.ContentType.Name
      });

      return Ok(dtos);
    }

    // POST: api/content
    [HttpPost]
    public async Task<ActionResult> Create(ContentCreateDto dto)
    {
      var content = _mapper.Map<Content>(dto);

      _context.Contents.Add(content);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetAll), new { id = content.ContentId }, content);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, ContentCreateDto dto)
    {
      var content = await _context.Contents.FindAsync(id);
      if (content == null)
        return NotFound();

      _mapper.Map(dto, content);
      content.UpdatedAt = DateTime.Now;

      await _context.SaveChangesAsync();
      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var content = await _context.Contents.FindAsync(id);
        if (content == null)
            return NotFound();

        _context.Contents.Remove(content);
        await _context.SaveChangesAsync();

        return NoContent();
    }

  }
}
