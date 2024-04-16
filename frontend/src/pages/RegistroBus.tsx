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
    const [imageBase64, setImageBase64] = useState('');
    const image64Default =('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');
    const [nombreBus, setNombreBus] = useState('');
    const [isChecked, setIsChecked] = useState(true);
    const [patente, setPatente] = useState('');
    const [isOpenAlerta, setIsOpenAlerta] = useState(false);//Para abrir la alerta
    const [alertaExito, setAlertaExito] = useState(true);//Para que sea la vista sea de exito/error
    const [alertaMensaje, setAlertaMensaje] = useState('');//Texto que acompaña a la alerta
    const [nombreBusError, setNombreBusError] = useState('');
    const [limpiarImagen, setLimpiarImagen] = useState(false);
    const [patenteDisplay, setPatenteDisplay] = useState('');
    const [matriculaError, setMatriculaError] = useState('');
    const [registroValido, setRegistroValido] = useState(false);

    const handleImagenChange = (file: File | null) => {
      setLimpiarImagen(false);
      setImagen(file);
      if (file !==null) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64Image = reader.result?.toString();
          if (base64Image) {
            //console.log(base64Image); 
            setImageBase64(base64Image);
          }
        };
      }
      else{
        setImageBase64(image64Default);
      }
    };

    const handleRegistroClick = (event: React.FormEvent) => {
      if (imagen === null) {
        setImageBase64(image64Default);
      }
      event.preventDefault();
      setIsOpenAlerta(true);
      validarRegistro();
      console.log(nombreBus);
      console.log(patente);
      console.log(imagen?.name);
      console.log(isChecked);
      console.log(imageBase64);
      //Logica para subir y tener respuestas del backend aqui
  
      //comprobar si el registro fue exitoso en backend y emitir alertas
      if (1 > 0) {
          setAlertaExito(true);
          setAlertaMensaje('Registro exitoso.');
      } else {
          setAlertaExito(false);
          setAlertaMensaje('Error al registrar el bus.');
      }
    };

    //al cancelar , muestra alerta y redirige a la pagina anterior (por ahora solo recarga la pagina , cambiar a futuro)
    const handleCancelarClik = (event: React.FormEvent) => {
      event.preventDefault();
      setIsOpenAlerta(true);
      setAlertaExito(false);
      setAlertaMensaje('Has cancelado el registro.');
      setTimeout(() => {
        window.location.reload();
      }, 3000); // 3000 milisegundos = 3 segundos
    };

    //se vacian todos los campos del formulario , y los errores
    const handleLimpiarClick = (event: React.FormEvent) => {
      setImagen(null);
      setLimpiarImagen(true);
      setNombreBus('');
      setNombreBusError('');
      setIsChecked(true);
      setPatente('');
      setMatriculaError('');
      setPatenteDisplay('');
      setRegistroValido(false);
      setImageBase64('');
      event.preventDefault();
      setIsOpenAlerta(true);
      setAlertaExito(true);
      setAlertaMensaje('Se limpiaron los campos.');
    };

    //validacion de matricula
    const handleChangePatente = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim().toUpperCase(); // Convertir a mayúsculas y eliminar espacios en blanco al inicio y al final
      setPatenteDisplay(value);
  
      const formattedValue = value.replace(/-/g, '');
      setPatente(formattedValue);
  
      const matriculaRegex = /^([A-Z]{2}-?\d{2}-?\d{2}|[A-Z]{2}-?\d{4}|[A-Z]{4}-?\d{2}|[A-Z]{4}\d{2})$/;
      if (!matriculaRegex.test(formattedValue)) {
        setMatriculaError('Formato de matrícula no válido.'); //mensaje de error que se muestra
      } else {
        setMatriculaError('');
      }
    };

    //se validan que los campos sean validos
    const validarRegistro = () => {
      if (nombreBus && !nombreBusError && patente && !matriculaError) {
        setRegistroValido(true);
      } else {
        setRegistroValido(false);
      }
    };
    //cuando se cierra la alerta (hijo) , cambia el estado aqui en el padre
    const handleCloseAlerta = () => {
      setIsOpenAlerta(false);
    };

  return (
    <div className='h-screen flex flex-col justify-between'>
        <NavBar/>
        <div className='px-6 py-6 text-textoCard'>
            <form className="mx-auto bg-fondoCard h-auto py-4 px-4 rounded-xl flex flex-col drop-shadow-md max-w-2xl">
                <span className='py-4 font-bold text-3xl text-center'>Registro De Bus</span>
                <div className='flex flex-col mt-2'>
                    <div className="mb-5">
                        <label className=' text-xl font-semibold'>Nombre del Bus</label>
                        <input  type="text" 
                                value={nombreBus}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setNombreBus(value);
                                    if (value.length > 50) {
                                        setNombreBusError('El nombre del bus no puede tener más de 50 caracteres.'); //mensaje de error que se muestra
                                    } else {
                                        setNombreBusError('');
                                    }
                                }}
                                onBlur={validarRegistro}
                                className={`bg-gray-300 text-lg border placeholder:text-md placeholder:font-semibold  placeholder-white rounded-lg block w-full p-2.5 ${nombreBusError ? 'text-red-500 border-red-500' : ''}`} placeholder="Bus Institucional"/>
                        {nombreBusError && <p className="text-red-500">{nombreBusError}</p>}
                    </div>
                    <div className="mb-5" >
                        <label className=' text-xl font-semibold'>Patente</label>
                        <input 
                          type="text"
                          id="matricula"
                          value={patenteDisplay}
                          onChange={handleChangePatente}
                          onBlur={validarRegistro}
                          className={`bg-gray-300 border hoover:border-orange-400 placeholder:text-md placeholder:font-semibold placeholder-white rounded-lg block w-full p-2.5 form-input ${matriculaError ? 'border-red-500 text-red-500' : ''}`} placeholder="XX-XX-00 u XX-00-00"/>
                          {matriculaError && <p className="text-red-500">{matriculaError}</p>}
                    </div>
                    <div className="mb-5">
                        <label className=' text-xl font-semibold'>Adjuntar Imagen (Opcional)</label>
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
                              className={`bg-botonNaranja rounded-lg px-2 py-1 ml-2 font-semibold md:text-xl
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


