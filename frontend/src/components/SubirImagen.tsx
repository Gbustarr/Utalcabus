import React, { useState, ChangeEvent } from 'react';

interface SubirImagenProps {
    onImagenChange: (file: File | null) => void;
  }

function SubirImagen({ onImagenChange }: SubirImagenProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
            <div className='text-semibold text-white'>Imagen: {file.name}</div>
                <div className="flex justify-center">
                    {preview && <img src={preview} alt="Preview" className="max-w-72 max-h-32"/>}
                </div>
        </div>
        )}
        <label className="relative overflow-hidden cursor-pointer w-full h-auto">
            <button className="w-full mr-4 py-2 text-md font-semibold rounded-2xl bg-orange-400 text-white hover:bg-orange-200">{file ? 'Cambiar Imagen' : 'Subir Imagen'}</button>
            <input type="file" onChange={handleChange} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"/>
        </label>
        {error && <div className="text-red-600 font-bold text-sm">{error}</div>}
    </div>
  );
}

export default SubirImagen;


