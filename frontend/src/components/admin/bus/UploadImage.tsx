import { ChangeEvent, RefObject } from "react";

interface UploadImagesProps {
  selectedImage: File | null
  imageRef: RefObject<HTMLInputElement>
  handleChangeImage: (e: ChangeEvent<HTMLInputElement>) => void
  handleClearImage: () => void
  errorMessage: string | null
}

export const UploadImage = ({ selectedImage, handleChangeImage, handleClearImage, imageRef, errorMessage }: UploadImagesProps) => {

  return (
    <div className='flex items-center flex-col justify-center mx-auto'>
      {selectedImage && (
        <div className='mb-2'>
          <div className='text-semibold text-textoCard mb-3'>Imagen: {selectedImage.name}</div>
          <div className="flex justify-center">
            <img src={URL.createObjectURL(selectedImage)} alt="Imagen seleccionada" />
          </div>
        </div>
      )}
      {!selectedImage && (
        <label className="relative overflow-hidden cursor-pointer mx-auto h-auto mt-1 max-w-60 ">
          <button className="md:min-w-32 min-w-44 py-2 text-md font-semibold rounded-2xl bg-fondoBoton text-white hover:bg-orange-200">Subir</button>
          <input
            ref={imageRef}
            type="file"
            accept="image/jpg"
            onChange={handleChangeImage}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
        </label>

      )}

      {selectedImage ? (
        <div className="relative overflow-hidden cursor-pointer w-full h-auto mt-1 max-w-60 ">
          <button className="w-full py-2 text-md font-semibold rounded-2xl bg-fondoBotonLimpiar text-white hover:bg-orange-200" onClick={handleClearImage}>Quitar selección</button>
        </div>

      ) : null}
      {errorMessage && <div className="ml-6 text-red-600 font-bold text-sm">{errorMessage}</div>}
    </div>
  )
}
