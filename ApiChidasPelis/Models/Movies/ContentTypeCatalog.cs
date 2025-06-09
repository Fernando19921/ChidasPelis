using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiChidasPelis.Models
{
    [Table("ContentTypeCatalog")]
    public class ContentTypeCatalog
    {
        [Key]
        [Column("id_content_type")]
        public int IdContentType { get; set; }

        [Required]
        [MaxLength(30)]
        public string Name { get; set; } = null!;

        public ICollection<Content> Contents { get; set; } = new List<Content>();
    }
}
