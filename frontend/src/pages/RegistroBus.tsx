import React, { useState } from 'react';
import SubirImagen from '../components/SubirImagen';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
function Checkbox() {
  const [checked, setChecked] = useState(true);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex items-center mt-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="form-checkbox h-5 w-5"
      />
      <span className="ml-2 text-md text-white">{checked ? 'Habilitado' : 'Deshabilitado'}</span>
    </div>
  );
}

function RegistroBus() {
    const [imagen, setImagen] = useState<File | null>(null);

    const handleImagenChange = (file: File | null) => {
        setImagen(file);
        //console.log(file?.name)
    };
  return (
    <div className='h-screen flex flex-col justify-between bg-gray-200  '>
        <NavBar/>
        <div className='px-6 py-6'>
            <form className="mx-auto bg-gray-400 h-auto py-4 px-4 rounded-xl flex flex-col shadow-lg md:max-w-3xl">
                <span className='py-4 text-white font-bold text-3xl text-center'>Registro De Bus</span>
                <div className='flex flex-col mt-2'>
                    <div className="mb-5">
                        <label className='text-white text-xl font-semibold'>Nombre del Bus</label>
                        <input type="text" className="bg-cyan-50 border border-cyan-500 text-black placeholder-cyan-500 text-sm rounded-lg block w-full p-2.5" placeholder="Bus Institucional" />
                    </div>
                    <div className="mb-5" >
                        <label className='text-white text-xl font-semibold'>Matrícula</label>
                        <input type="text" className="bg-cyan-50 border border-cyan-500 text-black placeholder-cyan-500 text-sm rounded-lg block w-full p-2.5" placeholder="XX-00-00 u XX-XX-00" />
                    </div>
                    <div className="mb-5">
                        <label className='text-white text-xl font-semibold'>Adjuntar Imagen</label>
                        <SubirImagen onImagenChange={handleImagenChange}/>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col'>
                        <label className='text-white text-xl font-semibold' >Estado del Bus</label>
                        <Checkbox/> 
                    </div>
                    <div className='flex flex-row justify-between mt-6'>
                        <div>
                            <button className='bg-blue-500 rounded-lg px-6 py-1 text-white font-semibold'>Limpiar</button>
                        </div>
                        <div className='text-white'>
                            <button className='bg-blue-500 rounded-lg px-2 py-1 font-semibold'>Cancelar</button>
                            <button className='bg-blue-500 rounded-lg px-2 py-1 ml-2 font-semibold'>Registrar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <Footer/>
    </div>
  );
}

export default RegistroBus;


