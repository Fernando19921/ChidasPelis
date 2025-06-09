using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ApiChidasPelis.Models
{
    [Table("Content")]
    public class Content
    {
        [Key]
        [Column("content_id")]
        public int ContentId { get; set; }

        [Column("name")]
        public string? Name { get; set; }

        [Column("img")]
        public string? Img { get; set; }

        [Column("trailer")]
        public string? Trailer{ get; set; }

        [Column("time")]
        public int Time { get; set; }

        [Column("rating")]
        [Precision(3, 1)]
        public decimal? Rating { get; set; }

        [Column("release_year")]
        public int? ReleaseYear { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("Director")]
        public string? Director { get; set; }

        [Column("gender_id")]
        public int GenderId { get; set; }

        [Column("content_type_id")]
        public int ContentTypeId { get; set; }

        [Column("created_at")]
        public DateTime? CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }

        // Relaciones
        public GenderCatalog Gender { get; set; } = null!;
        public ContentTypeCatalog ContentType { get; set; } = null!;
        public ICollection<Favorites> Favorites { get; set; } = new List<Favorites>();
    }
}
