using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiChidasPelis.Models
{
    public class Favorites
    {
        [Key]
        [Column("id_favorite")]
        public int IdFavorite { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }

        [Column("content_id")]
        public int ContentId { get; set; }

        [Column("created_at")]
        public DateTime? CreatedAt { get; set; }

        public User User { get; set; } = null!;
        public Content Content { get; set; } = null!;
    }
}
