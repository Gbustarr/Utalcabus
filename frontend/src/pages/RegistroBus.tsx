import React, { useState } from 'react';
import SubirImagen from '../components/SubirImagen';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Alerta from '../components/Alerta';

function Checkbox({ isChecked, onChange }: { isChecked: boolean; onChange: (isChecked: boolean) => void }) {
  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    onChange(newValue);
  };

  return (
    <div className="flex items-center mt-2">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="form-checkbox h-5 w-5"
      />
      <span className="ml-2 text-md text-textoCard">{isChecked ? 'Habilitado' : 'Deshabilitado'}</span>
    </div>
  );
}


function RegistroBus() {
    const [imagen, setImagen] = useState<File | null>(null);
    const [nombreBus, setNombreBus] = useState('');
    const [isChecked, setIsChecked] = useState(true);
    const [matricula, setMatricula] = useState('');
    const [isOpenAlerta, setIsOpenAlerta] = useState(false);
    const [alertaExito, setAlertaExito] = useState(true);
    const [alertaMensaje, setAlertaMensaje] = useState('');
    const [nombreBusError, setNombreBusError] = useState('');
    const [limpiarImagen, setLimpiarImagen] = useState(false);
    const [matriculaDisplay, setMatriculaDisplay] = useState('');
    const [matriculaError, setMatriculaError] = useState('');
    const [registroValido, setRegistroValido] = useState(false);

    const handleImagenChange = (file: File | null) => {
        validarRegistro();
        setLimpiarImagen(false);
        setImagen(file);
        //console.log(file?.name)
    };

    const handleRegistroClick = (event: React.FormEvent) => {
      event.preventDefault();
      setIsOpenAlerta(true);
      validarRegistro();
      if(imagen !== null){
        if (1 > 0) {
            setAlertaExito(true);
            setAlertaMensaje('Registro exitoso.');
            console.log(nombreBus);
            console.log(matricula);
            console.log(imagen.name);
            console.log(isChecked);
        } else {
            setAlertaExito(false);
            setAlertaMensaje('Error al registrar el bus.');
        }
      }
      else{
        setAlertaExito(false);
        setAlertaMensaje('Ha ocurrido un error con la imagen , subela nuevamente.');
      }
    };

    const handleCancelarClik = (event: React.FormEvent) => {
      event.preventDefault();
      setIsOpenAlerta(true);
      setAlertaExito(false);
      setAlertaMensaje('Has cancelado el registro');
      setTimeout(() => {
        window.location.reload();
      }, 3000); // 3000 milisegundos = 3 segundos
    };

    const handleLimpiarClick = (event: React.FormEvent) => {
      setImagen(null);
      setLimpiarImagen(true);
      setNombreBus('');
      setNombreBusError('');
      setIsChecked(true);
      setMatricula('');
      setMatriculaError('');
      setMatriculaDisplay('');
      setRegistroValido(false)
      event.preventDefault();
      setIsOpenAlerta(true);
      setAlertaExito(true);
      setAlertaMensaje('Se limpiaron los campos.');
    };

    const handleChangeMatricula = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim().toUpperCase(); // Convertir a mayúsculas y eliminar espacios en blanco al inicio y al final
      setMatriculaDisplay(value);
  
      const formattedValue = value.replace(/-/g, '');
      setMatricula(formattedValue);
  
      const matriculaRegex = /^([A-Z]{2}-?\d{2}-?\d{2}|[A-Z]{2}-?\d{4}|[A-Z]{4}-?\d{2}|[A-Z]{4}\d{2})$/;
      if (!matriculaRegex.test(formattedValue)) {
        setMatriculaError('Formato de matrícula no válido.');
      } else {
        setMatriculaError('');
      }
    };

    const validarRegistro = () => {
      if (nombreBus && !nombreBusError && matricula && !matriculaError && imagen != null) {
        setRegistroValido(true);
      } else {
        setRegistroValido(false);
      }
    };

    const handleCloseAlerta = () => {
      setIsOpenAlerta(false);
    };
  return (
    <div className='h-screen flex flex-col justify-between'>
        <NavBar/>
        <div className='px-6 py-6 text-textoCard'>
            <form className="mx-auto bg-fondoCard h-auto py-4 px-4 rounded-xl flex flex-col drop-shadow-md md:max-w-3xl">
                <span className='py-4 font-bold text-3xl text-center'>Registro De Bus</span>
                <div className='flex flex-col mt-2'>
                    <div className="mb-5">
                        <label className=' text-xl font-semibold'>Nombre del Bus</label>
                        <input  type="text" 
                                value={nombreBus}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setNombreBus(value);
                                    if (value.length > 90) {
                                        setNombreBusError('El nombre del bus no puede tener más de 90 caracteres.');
                                    } else {
                                        setNombreBusError('');
                                    }
                                }}
                                onBlur={validarRegistro}
                                className={`bg-gray-300 text-lg border placeholder:text-md placeholder:font-semibold  placeholder-white rounded-lg block w-full p-2.5 ${nombreBusError ? 'text-red-500 border-red-500' : ''}`} placeholder="Bus Institucional"/>
                        {nombreBusError && <p className="text-red-500">{nombreBusError}</p>}
                    </div>
                    <div className="mb-5" >
                        <label className=' text-xl font-semibold'>Matrícula</label>
                        <input 
                          type="text"
                          id="matricula"
                          value={matriculaDisplay}
                          onChange={handleChangeMatricula}
                          onBlur={validarRegistro}
                          className={`bg-gray-300 border hoover:border-orange-400 placeholder:text-md placeholder:font-semibold placeholder-white rounded-lg block w-full p-2.5 form-input ${matriculaError ? 'border-red-500 text-red-500' : ''}`} placeholder="XX-XX-00 u XX-00-00"/>
                          {matriculaError && <p className="text-red-500">{matriculaError}</p>}
                    </div>
                    <div className="mb-5">
                        <label className=' text-xl font-semibold'>Adjuntar Imagen</label>
                        <SubirImagen onImagenChange={handleImagenChange} limpiarImagen={limpiarImagen} />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col'>
                        <label className=' text-xl font-semibold' >Estado del Bus</label>
                        <Checkbox isChecked={isChecked} onChange={setIsChecked} />
                    </div>
                    <div className='flex flex-row justify-between mt-6'>
                        <div>
                            <button className='bg-gray-400 rounded-lg px-6 py-1 text-white font-semibold md:text-xl hover:bg-orange-400 hover:text-white' onClick={handleLimpiarClick}>Limpiar</button>
                        </div>
                        <div className='text-white'>
                            <button className='bg-white rounded-lg px-2 py-1 text-orange-400 font-semibold md:text-xl hover:bg-orange-400 hover:text-white'onClick={handleCancelarClik}>Cancelar</button>
                            <button
                              className={`bg-fondoBoton rounded-lg px-2 py-1 ml-2 font-semibold md:text-xl
                              ${!registroValido ? 'bg-gray-500' : ''}`} 
                              onClick={handleRegistroClick}
                              disabled={!registroValido}>
                              Registrar 
                              </button>
                        </div>
                    </div>
                </div>
            </form>
            <Alerta isOpen={isOpenAlerta} onClose={handleCloseAlerta} isSuccess={alertaExito} mensaje={alertaMensaje} />
        </div>
        <Footer/>
    </div>
  );
}

export default RegistroBus;


