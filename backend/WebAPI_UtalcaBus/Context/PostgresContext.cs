using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebAPI_UtalcaBus.Entities;

namespace WebAPI_UtalcaBus.Context;

public class PostgresContext: IdentityDbContext
{
    public PostgresContext(DbContextOptions<PostgresContext> options): base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {   
        base.OnModelCreating(modelBuilder);
        //Unique Bus
        modelBuilder.Entity<Bus>()
            .HasIndex(p => new {p.patente}).IsUnique();
    }
    
    public DbSet<Imagen> imagen { get; set; }
    public DbSet<Bus> bus { get; set; }
}