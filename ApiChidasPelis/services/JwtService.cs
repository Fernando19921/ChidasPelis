using System.IdentityModel.Tokens.Jwt;//Librería que permite crear y manejar tokens JWT.
using System.Security.Claims; // Te permite agregar datos del usuario como "reclamaciones" (claims) en el token
using System.Text; //Necesaria para convertir la clave secreta a `byte[]`.
using Microsoft.IdentityModel.Tokens; //Contiene clases para definir la firma y seguridad del token.
using ApiChidasPelis.Models;


namespace ApiChidasPelis.Services
{

    public class JwtService
    {
        private readonly IConfiguration _config;
        public JwtService(IConfiguration config){
            _config = config;
        }

        public string GenerateToken(User user)
        {
            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()), // ID del usuario (clave principal
                new Claim(ClaimTypes.Email, user.Email ?? ""),//  Email del usuario
                new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin" :"User"), //Si es admin o usuario normal.
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!)); //Convierte la clave secreta a un objeto SymmetricSecurityKey.
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256); //Define que se usará HMAC SHA256 para firmar el token (evita que sea alterado por terceros).



            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"], // Quién genera el token (tú).
                audience: _config["Jwt:Audience"], //Quién lo usará (el cliente).
                claims: claims, // Información del usuario.
                expires: DateTime.Now.AddHours(2), //Cuándo caduca el token (2 horas).
                signingCredentials: creds // Firma digital.
            );
            return new JwtSecurityTokenHandler().WriteToken(token);//Convierte el objeto JwtSecurityToken a un string JWT que puedes enviar como respuesta.
        }
    }
}