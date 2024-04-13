using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI_UtalcaBus.Entities;

public class Conductor
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid id { get; set; }
    
    public required String nombre { get; set; }
    public required String correo { get; set; }
    
    //FK Estado
    public Guid estadoId { get; set; }
    [ForeignKey("estadoId")]
    public Estado estado { get; set; }
}