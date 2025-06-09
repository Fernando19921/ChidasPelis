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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FavoritesReadDto>>> GetAll()
    {
      var favs = await _context.Favorites
          .Include(f => f.User)
          .Include(f => f.Content)
          .ToListAsync();

      var dtos = favs.Select(f => new FavoritesReadDto
      {
        IdFavorite = f.IdFavorite,
        UserName = f.User.FirstName + " " + f.User.LastName,
        ContentName = f.Content.Name ?? "",
        Img = f.Content.Img
      });

      return Ok(dtos);
    }

    [HttpPost]
    public async Task<ActionResult> Create(FavoritesCreateDto dto)
    {
      var favorite = _mapper.Map<Favorites>(dto);
      _context.Favorites.Add(favorite);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetAll), new { id = favorite.IdFavorite }, favorite);
    }
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
    }
}
