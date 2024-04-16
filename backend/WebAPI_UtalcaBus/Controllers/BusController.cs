using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_UtalcaBus.Context;
using WebAPI_UtalcaBus.Entities;

namespace WebAPI_UtalcaBus.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BusController: Controller
{
    private readonly PostgresContext _postgresContext;

    public BusController(PostgresContext postgresContext)
    {
        _postgresContext = postgresContext;
    }
    
    [HttpGet]
    public async Task<ActionResult<List<Bus>>> getAllBuses()
    {
        var buses = await _postgresContext.bus.ToListAsync();
        return Ok(buses);
    }
    
    [HttpGet("id/{id}")]
    public async Task<ActionResult<Bus>> getBusById(Guid id)
    {
        var bus = await _postgresContext.bus.FindAsync(id);
        if (bus is null)
        {
            return NotFound("Bus no encontrado ese id");
        }
        return Ok(bus);
    }
    
    [HttpGet("patente/{patente}")]
    public async Task<ActionResult<Bus>> getBusByPatente(String patente)
    {
        var bus = await _postgresContext.bus.FirstOrDefaultAsync(bus => bus.patente == patente);
        if (bus is null)
        {
            return NotFound("Bus no encontrado esa patente");
        }
        return Ok(bus);
    }
    
    [HttpPost]
    public async Task<ActionResult<Bus>> addBus(Bus bus)
    {
        // poner la condicional, en nuestro caso, un bus se identifica por nombre por ejemplo (y luego patente)
        var existeBus = await _postgresContext.bus.AnyAsync(e=>e.patente == bus.patente);
        if (existeBus)
        {
            return Conflict("Ya existe un bus con esa patente");
        }
        
        _postgresContext.bus.Add(bus);
        await _postgresContext.SaveChangesAsync();

        return Ok(bus);
    }
    
    [HttpPut("{id}/habilitado/{habilitado}")]
    public async Task<IActionResult> UpdateHabilitado(Guid id, bool habilitado)
    {
        // Busca el Bus por su id
        var bus = await _postgresContext.bus.FindAsync(id);
        if (bus == null)
        {
            return NotFound("Bus no encontrado con ese id");
        }
        
        bus.habilitado = habilitado;
        
        await _postgresContext.SaveChangesAsync();
        return Ok(bus);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBus(Guid id)
    {
        var bus = await _postgresContext.bus.FindAsync(id);
        if (bus == null)
        {
            return NotFound("Bus no encontrado con ese id");
        }
        
        _postgresContext.bus.Remove(bus);
        await _postgresContext.SaveChangesAsync();
        
        return NoContent();
    }

	[HttpDelete("patente/{patente}")]
    public async Task<ActionResult<Bus>> DeleteBusByPatente(String patente)
    {
        var bus = await _postgresContext.bus.FirstOrDefaultAsync(bus => bus.patente == patente);
        if (bus is null)
        {
            return NotFound("Bus no encontrado esa patente");
        }
		_postgresContext.bus.Remove(bus);
         await _postgresContext.SaveChangesAsync();
        
        return NoContent();
    }
}