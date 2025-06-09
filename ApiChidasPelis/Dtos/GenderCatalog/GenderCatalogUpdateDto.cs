using System.ComponentModel.DataAnnotations;

namespace ApiChidasPelis.Dtos
{
    public class GenderCatalogUpdateDto
    {
        [Required]
        [MaxLength(30)]
        public string Name { get; set; } = null!;
    }
}
