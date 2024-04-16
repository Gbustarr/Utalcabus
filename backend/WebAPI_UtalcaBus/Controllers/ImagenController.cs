using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_UtalcaBus.Context;
using WebAPI_UtalcaBus.Entities;

namespace WebAPI_UtalcaBus.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ImagenController: Controller
{
    private readonly PostgresContext _postgresContext;

    public ImagenController(PostgresContext postgresContext)
    {
        _postgresContext = postgresContext;
    }
    
    [HttpGet]
    public async Task<ActionResult<List<Imagen>>> getAllImagenes()
    {
        var imagenes = await _postgresContext.imagen.ToListAsync();
        return Ok(imagenes);
    }
    
    [HttpGet("id/{id}")]
    public async Task<ActionResult<Imagen>> getImagenById(Guid id)
    {
        var imagen = await _postgresContext.imagen.FindAsync(id);
        if (imagen is null)
        {
            return NotFound("Iagen no encontrada ese id");
        }
        return Ok(imagen);
    }
    
    [HttpGet("find_by_nombre_and_tipo_archivo")]
    public async Task<ActionResult<Imagen>> getImagenByNombre([FromQuery] String nombre, [FromQuery] String tipo_archivo)
    {
        var imagen = await _postgresContext.imagen.FirstOrDefaultAsync(imagenIt => imagenIt.nombre == nombre && imagenIt.tipo_archivo == tipo_archivo);
        if (imagen is null)
        {
            return NotFound("Imagen no encontrada ese nombre y tipo_archivo");
        }
        return Ok(imagen);
    }

    [HttpPost]
    public async Task<ActionResult<Imagen>> addImagen([FromBody] Imagen imagen)
    {
        if (imagen.tipo_archivo != "jpg" && imagen.tipo_archivo != "jpeg" && imagen.tipo_archivo != "png")
        {
            return Conflict("Tipo de archivo para imagen invalido, no permitido");
        }

        var imagenExistente = await _postgresContext.imagen.FirstOrDefaultAsync
            (imagenIt => imagenIt.nombre == imagen.nombre && imagenIt.tipo_archivo == imagen.tipo_archivo);
        if (imagenExistente != null)
        {
            return Conflict("Ya existe una imagen cono ese nombre y ese tipo de archivo");
        }

        _postgresContext.imagen.Add(imagen);
        await _postgresContext.SaveChangesAsync();

        return Ok(imagen);
    }
}