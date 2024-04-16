# WebAPI .Net Core 8

Notar que, appsettings.json y appsettings.Development.json son las variables que usaremos tanto en producción como desarrollo respectivamente, por tanto, se incluyen en el .gitignore ya que puede incluir credenciales sensibles.

Por tanto, escribiré un ejemplo (común en ambos archivos de lo que debería contener):

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "Connection": "Host=;Database=;Username=;Password=;"
  }
}
```

Notar que, en Connection = deberías añadir, entre comillas, la información detallada. Por ejemplo
```
...;Username="luiszamorano";...
```