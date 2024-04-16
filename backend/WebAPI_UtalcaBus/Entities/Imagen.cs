using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI_UtalcaBus.Entities;

public class Imagen
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid id { get; set; }
    
    public required String nombre { get; set; }
    
    public required String descripcion { get; set; }
   
    public required byte[] base64 { get; set; }
    
    [StringLength(50)]
    public required String tipo_archivo { get; set; }
}

