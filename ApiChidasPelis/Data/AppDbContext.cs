using ApiChidasPelis.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiChidasPelis.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSets
        public DbSet<User> Users { get; set; }
        public DbSet<Content> Contents { get; set; }
        public DbSet<Favorites> Favorites { get; set; }
        public DbSet<GenderCatalog> GenderCatalogs { get; set; }
        public DbSet<ContentTypeCatalog> ContentTypeCatalogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User: email único
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Relaciones
            modelBuilder.Entity<Content>()
                .HasOne(c => c.Gender)
                .WithMany(g => g.Contents)
                .HasForeignKey(c => c.GenderId);

            modelBuilder.Entity<Content>()
                .HasOne(c => c.ContentType)
                .WithMany(ct => ct.Contents)
                .HasForeignKey(c => c.ContentTypeId);

            modelBuilder.Entity<Favorites>()
                .HasOne(f => f.User)
                .WithMany()
                .HasForeignKey(f => f.UserId);

            modelBuilder.Entity<Favorites>()
                .HasOne(f => f.Content)
                .WithMany(c => c.Favorites)
                .HasForeignKey(f => f.ContentId);
        }

        // Asignar automáticamente fechas CreatedAt y UpdatedAt
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.Entity is Content &&
                            (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in entries)
            {
                var content = (Content)entry.Entity;

                if (entry.State == EntityState.Added)
                {
                    content.CreatedAt = DateTime.UtcNow;
                }

                content.UpdatedAt = DateTime.UtcNow;
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
