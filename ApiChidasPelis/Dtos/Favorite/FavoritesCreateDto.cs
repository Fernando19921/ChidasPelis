using System.ComponentModel.DataAnnotations;
namespace ApiChidasPelis.Dtos
{
  public class FavoritesCreateDto
  {
    [Required]
    public int UserId { get; set; }

    [Required]
    public int ContentId { get; set; }

    


    }
}
