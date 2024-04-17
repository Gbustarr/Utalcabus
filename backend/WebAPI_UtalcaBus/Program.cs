using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebAPI_UtalcaBus.Config;
using WebAPI_UtalcaBus.Context;
using DotNetEnv;
using WebAPI_UtalcaBus.Entities;

Env.Load(); 
var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Connection");
builder.Services.AddDbContext<PostgresContext>(options => options.UseNpgsql(connectionString));


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.SignIn.RequireConfirmedEmail = false;
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 0;
});

builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);


builder.Services.AddIdentity<Usuario, IdentityRole>()
    .AddEntityFrameworkStores<PostgresContext>()
    .AddDefaultTokenProviders();
    
var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<Usuario>>();

    // Crear roles si no existen
    foreach (var roleName in new[] { RolesConfig.AdministradorRole, RolesConfig.ConductorRole, RolesConfig.PasajeroRole })
    {
        if (!await roleManager.RoleExistsAsync(roleName))
        {
            await roleManager.CreateAsync(new IdentityRole(roleName));
        }
    }
    
    var usuariosAdministradores = await userManager.GetUsersInRoleAsync("Administrador");
    ConsoleColor originalColor = Console.ForegroundColor;
    Console.ForegroundColor = ConsoleColor.Red;

    if (usuariosAdministradores.Count == 0)
    {
        System.Console.WriteLine("PROGRAM.CS => No existe un usuario administrador");
        var contrasena = builder.Configuration["CONTRASENA_ADMIN"];
   
        if (!string.IsNullOrEmpty(contrasena))
        {
           
                var nuevoUsuarioAdmin = new Usuario
                {
                    UserName = "Administrador",
                    Email = "administrador@utalcabus.cl",
                    habilitado = true,
                };
                
                var resultado = await userManager.CreateAsync(
                    nuevoUsuarioAdmin,
                    contrasena
                );
                
                if (resultado.Succeeded)
                {
                    await userManager.AddToRoleAsync(nuevoUsuarioAdmin, "Administrador");
                    Console.WriteLine("PROGRAM.CS => administrador@utalcabus.cl creado");
                }
                else
                {
                    Console.WriteLine("PROGRAM.CS => Error en la contraseña");
                }
            
        }
    }
    else
    {
        
        Console.Write("PROGRAM.CS => Ya existe un usuario administrador");
    }
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.MapGroup("/identity").MapIdentityApi<IdentityUser>();

app.UseHttpsRedirection();
app.MapControllers();

app.Run();