using Microsoft.EntityFrameworkCore;


using ApiChidasPelis.Models;

namespace ApiChidasPelis.Context
{
    public class AppContext : DbContext 
    {
        public AppContext(DbContextOptions<AppContext> options) : base(options)//Constructor
        {
        }

        public DbSet<User> Users { get; set; }
    }
}