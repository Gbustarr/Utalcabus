namespace WebAPI_UtalcaBus.DTOS.User;

public class AgregarConductorDTO
{
    public required String Nombre { get; set; }
    public required String Email { get; set; }
    public required String Contrasena { get; set; }
    public Guid? Imagen_id { get; set; }
}