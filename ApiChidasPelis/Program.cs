using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using ApiChidasPelis;
using ApiChidasPelis.Data;
using ApiChidasPelis.Services;
using AutoMapper;




var builder = WebApplication.CreateBuilder(args);

// ╔══════════════════════════════════════════════════════════════╗
// ║                     CONFIGURACIÓN DE SERVICIOS               ║
// ╚══════════════════════════════════════════════════════════════╝

// 📌 Cadena de conexión
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// 📌 Controladores
builder.Services.AddControllers();

// 📌 AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);



// 📌 Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 📌 Rutas en minúsculas
builder.Services.AddRouting(options =>
{
    options.LowercaseUrls = true;
});

// 📌 JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
            )
        };
    });

// 📌 Servicios personalizados
builder.Services.AddScoped<JwtService>();

// 📌 CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200") // frontend
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ╔══════════════════════════════════════════════════════════════╗
// ║                     CONFIGURACIÓN DEL PIPELINE              ║
// ╚══════════════════════════════════════════════════════════════╝

var app = builder.Build();

app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection(); // Puedes activarlo si usas HTTPS

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
