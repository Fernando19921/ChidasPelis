using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ApiChidasPelis.Models
{
    [Table("User")]
    public class User
    {
        [Key]
        [Column("user_id")]
        public int UserId { get; set; }

        [MaxLength(30)]
        [Column("first_name")]
        public string? FirstName { get; set; }

        [MaxLength(30)]
        [Column("last_name")]
        public string? LastName { get; set; }

        [Required]
        [MaxLength(110)]
        [EmailAddress]
        [Column("email")]
        public string? Email { get; set; }

        // ✅ Esta es la contraseña cifrada (guardada en BD)
        [MaxLength(255)]
        [JsonIgnore] // No se expone en las respuestas
        [Column("password")]
        public string? PasswordHash { get; set; }

        [Column("is_admin")]
        public bool IsAdmin { get; set; } = false;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Column("updated_at")] 
        public DateTime UpdateAt { get; set; } = DateTime.Now;

        // ✅ Esta propiedad solo se usa para recibir la contraseña desde el cliente
        [NotMapped]
        public string? Password { get; set; }

        // ✅ Método para cifrar
        public void SetPassword(string plainPassword)
        {
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(plainPassword);
        }

        // ✅ Método para verificar login
        public bool CheckPassword(string plainPassword)
        {
            return BCrypt.Net.BCrypt.Verify(plainPassword, PasswordHash);
        }
    }
}
