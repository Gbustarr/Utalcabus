using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace WebAPI_UtalcaBus.Entities;

public class Usuario: IdentityUser
{
    [DefaultValue(true)]
    public required Boolean habilitado { get; set; }
    
    public Guid? imagen_id { get; set; }
    [ForeignKey("imagen_id")]
    public Imagen? imagen { get; set; }
}