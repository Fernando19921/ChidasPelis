using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiChidasPelis.Models
{
    [Table("GenderCatalog")]
    public class GenderCatalog
    {
        [Key]
        [Column("id_gender")]
        public int IdGender { get; set; }

        public string Name { get; set; } = null!;

        [Column("created_at")]
        public DateTime? CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }

        public ICollection<Content> Contents { get; set; } = new List<Content>();
    }
}
