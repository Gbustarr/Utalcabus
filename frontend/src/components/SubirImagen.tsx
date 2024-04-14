import React, { useState, ChangeEvent ,useEffect} from 'react';

interface SubirImagenProps {
    onImagenChange: (file: File | null) => void;
    limpiarImagen: boolean; 
  }

function SubirImagen({ onImagenChange, limpiarImagen }: SubirImagenProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (limpiarImagen) {
      setFile(null);
      setError(null);
      setPreview(null);
    }
  }, [limpiarImagen]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/') && selectedFile.size <= 1048576) { // 1MB en bytes
      setFile(selectedFile);
      setError(null);
      setPreview(URL.createObjectURL(selectedFile));
      onImagenChange(selectedFile);
    } else {
      setFile(null);
      setError('Seleccione una imagen valida (Max: 1MB)');
      setPreview(null);
      onImagenChange(null);
    }
  };

  return (
    <div className='flex items-center flex-col'>
        {file && (
        <div className='mb-2'>
            <div className='text-semibold text-textoCard mb-3'>Imagen: {file.name}</div>
                <div className="flex justify-center">
                    {preview && <img src={preview} alt="Preview" className="max-w-72 max-h-32 rounded-md"/>}
                </div>
        </div>
        )}
        <label className="relative overflow-hidden cursor-pointer w-full h-auto mt-1">
            <button className="w-full py-2 text-md font-semibold rounded-2xl bg-fondoBoton text-white hover:bg-orange-200">{file ? 'Cambiar Imagen' : 'Subir Imagen'}</button>
            <input type="file" onChange={handleChange} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"/>
        </label>
        {error && <div className="text-red-600 font-bold text-sm">{error}</div>}
    </div>
  );
}

export default SubirImagen;


