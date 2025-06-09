using System.ComponentModel.DataAnnotations;
namespace ApiChidasPelis.Dtos
{
  public class ContentCreateDto
  {

    [Required]
    [MaxLength(60)]
    public string Name { get; set; } = null!;

    [Url]
    public string? Img { get; set; }

    [Url]
    public string? Trailer { get; set; }

    [Required]
    [MaxLength(200)]
    public string Director { get; set; } = null!;

    [Required]
    [Range(1,600)]
    public int Time { get; set; }

    [Range(0, 10)]
    public decimal? Rating { get; set; }

    [Range(1900, 2100)]
    public int? ReleaseYear { get; set; }

    public string? Description { get; set; }

    [Required]
    public int GenderId { get; set; }

    [Required]
    public int ContentTypeId { get; set; }
  }
}
