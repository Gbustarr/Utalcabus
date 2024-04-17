using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebAPI_UtalcaBus.Context;
using WebAPI_UtalcaBus.DTOS;
using WebAPI_UtalcaBus.DTOS.User;
using WebAPI_UtalcaBus.Entities;

namespace WebAPI_UtalcaBus.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ConductorController: Controller
{
    private readonly UserManager<Usuario> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly PostgresContext _postgresContext;

    public ConductorController(UserManager<Usuario> userManager, RoleManager<IdentityRole> roleManager, PostgresContext postgresContext)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _postgresContext = postgresContext;

    }
    
    [HttpPost]
    [Route("registrar")]
    public async Task<IActionResult> RegistrarUsuario([FromBody] AgregarConductorDTO modelo)
    {
        var existeUsuario = await _userManager.FindByEmailAsync(modelo.Email);
        if (existeUsuario != null)
        {
            return Conflict("Ya existe un usuario registrado con ese email, intentalo nuevamente");
        }
        
        var existeRolConductor = await _roleManager.FindByNameAsync("Conductor");
        if (existeRolConductor == null)
        {
            return Conflict("No existe el rol 'Conductor' en la tabla de Roles");
        }

        if (modelo.Imagen_id != null)
        {
            var existeImagen = await _postgresContext.imagen.FindAsync(modelo.Imagen_id);
            if (existeImagen == null)
            {
                return Conflict("La imagen de perfil con la que intentas crear el usuario no existe");
            }
        }

        var nombreRolConductor = existeRolConductor.Name;
        
        var usuario = new Usuario
        {
            UserName = modelo.Nombre,
            Email = modelo.Email,
            habilitado = true,
        };

        if (modelo.Imagen_id != null)
        {
            usuario.imagen_id = modelo.Imagen_id;
        }
        var resultado = await _userManager.CreateAsync(usuario, modelo.Contrasena);
        
        if (!resultado.Succeeded)
        {
            return BadRequest(resultado.Errors);
        }
        
        await _userManager.AddToRoleAsync(usuario, nombreRolConductor);

        return Ok("Conductor registrado exitosamente.");
    }
}