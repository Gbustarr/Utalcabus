using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI_UtalcaBus.Entities;

public class Bus
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid id { get; set; }
    
    [StringLength(50)]
    public required String nombre { get; set; }
    [StringLength(20)]
    public required String patente { get; set; }
    
    [DefaultValue(true)]
    public required bool habilitado { get; set; }
    
    //FK imagen
    public Guid? imagen_id { get; set; }
    [ForeignKey("imagen_id")]
    public Imagen? imagen { get; set; }
}