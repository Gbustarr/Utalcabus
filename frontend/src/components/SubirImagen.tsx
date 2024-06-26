import React, { useState, ChangeEvent ,useEffect} from 'react';

interface SubirImagenProps {
    onImagenChange: (file: File | null) => void;
    limpiarImagen: boolean; 
  }

function SubirImagen({ onImagenChange, limpiarImagen }: SubirImagenProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // si limpiar imagen cambia desde el componente padre , la imagen se limpia aqui
  useEffect(() => {
    if (limpiarImagen) {
      setFile(null);
      setError(null);
      setPreview(null);
    }
  }, [limpiarImagen]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (!selectedFile) {
      // No se seleccionó ningún archivo
      setFile(null);
      setPreview(null);
      onImagenChange(null); // se envía la imagen como null al componente padre
      return;
    }
    if (selectedFile.size > 1048576) {
      // El tamaño del archivo excede el límite de 1MB
      setFile(null);
      setPreview(null);
      onImagenChange(null); // se envía la imagen como null al componente padre
      setError('La imagen es demasiado grande (Máx: 1MB).'); // mensaje de error
      return;
    }
    setFile(selectedFile);
    setError(null);
    setPreview(URL.createObjectURL(selectedFile));
    onImagenChange(selectedFile);
  };

  return (
    <div className='flex items-center flex-col justify-centerm mt-2'>
        {file && (
        <div className='mb-2'>
            <div className='text-semibold text-textoCard mb-3'>Imagen: {file.name}</div>
                <div className="flex justify-center">
                    {preview && <img src={preview} alt="Preview" className="max-w-72 max-h-32 rounded-md"/>}
                </div>
        </div>
        )}
        <label className="relative overflow-hidden cursor-pointer w-full h-auto mt-1 max-w-60 ">
            <button className="w-full py-2 text-md font-semibold rounded-2xl bg-botonNaranja text-white hover:bg-orange-200">{file ? 'Cambiar Imagen' : 'Subir Imagen'}</button>
            <input type="file" accept='.png,.jpg,.jpeg' onChange={handleChange} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"/>
        </label>
        {error && <div className="ml-6 text-red-600 font-bold text-sm">{error}</div>}
    </div>
  );
}

export default SubirImagen;


