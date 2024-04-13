using Microsoft.EntityFrameworkCore;
using WebAPI_UtalcaBus.Entities;

namespace WebAPI_UtalcaBus.Context;

public class PostgresContext: DbContext
{
    public PostgresContext(DbContextOptions<PostgresContext> options): base(options)
    {
    }
    
    public DbSet<Imagen> imagen { get; set; }

}