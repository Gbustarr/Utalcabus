import React, { ChangeEvent, useRef, useState } from 'react';
import Alerta from '../../components/Alerta';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { Checkbox } from '../../components/admin/bus/Checkbox';
import { UploadImage } from '../../components/admin/bus/UploadImage';

const MAX_SIZE_IMAGE = 1048576;

const INITIAL_DATA = {
  busName: 'Bus de oración',
  matricula: 'XXXX69',
  isChecked: true,
  imagen: null
}

export const UpdateBusPage = () => {

  // Se recuperan los datos con el useLocation de react-router-dom
  // const location = useLocation();
  // const { data } = location.state; 
  // const [busName, setBusName] = useState(data.busName);

  const [busName, setBusName] = useState(INITIAL_DATA.busName);
  const [isChecked, setIsChecked] = useState(INITIAL_DATA.isChecked);
  const [matricula, setMatricula] = useState(INITIAL_DATA.matricula);
  const [isOpenAlert, setIsOpenAlert] = useState(false);//Para abrir la alerta
  const [alertaExito, setAlertaExito] = useState(true);//Para que sea la vista sea de exito/error
  const [alertaMensaje, setAlertaMensaje] = useState('');//Texto que acompaña a la alerta
  const [busNameError, setBusNameError] = useState('');
  // const [cleanImage, setCleanImage] = useState(false);
  const [matriculaDisplay, setMatriculaDisplay] = useState(INITIAL_DATA.matricula);
  const [matriculaError, setMatriculaError] = useState('');
  const [registroValido, setRegistroValido] = useState(true);

  // Image
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // Este se probará cuando se recupere del backend.
  const imageRef = useRef<HTMLInputElement>(null);
  const [errorImagen, setErrorImagen] = useState<string | null>(null);
  const [imageConverted, setImageConverted] = useState<string | ArrayBuffer | null>(null);

  const handleRegistroClick = (event: React.FormEvent) => {
    event.preventDefault();
    setIsOpenAlert(true);
    validarRegistro();
    //Logica para subir y tener respuestas del backend aqui

    // Convertir matricula
    const formattedValue = matricula.replace(/-/g, '');
    setMatricula(formattedValue);

    //comprobar si el registro fue exitoso en backend y emitir alertas
    if (1 > 0) {
      setAlertaExito(true);
      setAlertaMensaje('Los datos se han modificado con éxito!');
    } else {
      setAlertaExito(false);
      setAlertaMensaje('¡Ha ocurrido un error al intentar modificar los datos!');
    }
  };

  //al cancelar , muestra alerta y redirige a la pagina anterior (por ahora solo recarga la pagina , cambiar a futuro)
  const handleCancelarClik = () => {
    // TODO: Implementar botón para volver atrás
    console.log('Soy un botón de volver atrás');

  };

  //se vacian todos los campos del formulario , y los errores
  const handleLimpiarClick = (event: React.FormEvent) => {
    event.preventDefault();
    handleClearImage();
    setBusName('');
    setBusNameError('');
    setIsChecked(true);
    setMatricula('');
    setMatriculaError('');
    setMatriculaDisplay('');
    setRegistroValido(false)
    setIsOpenAlert(true);
    setAlertaExito(true);
    setAlertaMensaje('Se limpiaron los campos.');
  };



  //se validan que los campos sean validos
  const validarRegistro = () => {
    if (busName && !busNameError && matricula && !matriculaError) {
      setRegistroValido(true);
    } else {
      console.log(matricula);
      setRegistroValido(false);
    }

  };
  //cuando se cierra la alerta (hijo) , cambia el estado aqui en el padre
  const handleCloseAlerta = () => {
    setIsOpenAlert(false);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBusName(value);
    if (value.length > 90) {
      setBusNameError('El nombre del bus no puede tener más de 90 caracteres.'); //mensaje de error que se muestra
      return;
    }
    setBusNameError('');
  };

  const handleChangeMatricula = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().toUpperCase(); // Convertir a mayúsculas y eliminar espacios en blanco al inicio y al final
    setMatriculaDisplay(value);
    setMatricula(value);

    if (value.length === 0) {
      setMatriculaError('');
      return;
    }

    const formattedValue = value.replace(/-/g, '');

    const matriculaRegex = /^([A-Z]{2}-?\d{2}-?\d{2}|[A-Z]{2}-?\d{4}|[A-Z]{4}-?\d{2}|[A-Z]{4}\d{2})$/;

    if (!matriculaRegex.test(formattedValue)) {
      setMatriculaError('Formato de matrícula no válido.'); //mensaje de error que se muestra
      return;
    }
    setMatriculaError('');
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const image = files[0];

      const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!acceptedTypes.includes(image.type)) {
        setErrorImagen('Solo se permiten imágenes JPEG, JPG y PNG.');
        return;
      }

      if (image.size <= MAX_SIZE_IMAGE) {
        setSelectedImage(image);
        convertImageBase64(image).then((base64String: string | null) => {
          if (base64String !== null) {
            setImageConverted(base64String); // Establecer el resultado en el estado
          } else {
            console.error("Error al convertir la imagen a base64.");
          }
        }); // Fix: Assign the returned value of convertImageBase64 to newImage state variable
        setErrorImagen(null);
        return;
      }
      setErrorImagen('Seleccione una imagen valida (Max: 1MB).');

    }
  }

  const convertImageBase64 = async (image: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };

      reader.onerror = () => {
        resolve(null); // En caso de error, devolvemos null
      };

      reader.readAsDataURL(image);
    });
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    if (imageRef.current) {
      imageRef.current.value = ''; // Reiniciar el valor del input
    }
    setErrorImagen(null);
  };

  const handleResetForm = (e: React.FormEvent) => {
    e.preventDefault();
    setBusName(INITIAL_DATA.busName);
    setMatricula(INITIAL_DATA.matricula);
    setMatriculaDisplay(INITIAL_DATA.matricula);
    setIsChecked(INITIAL_DATA.isChecked);
    setSelectedImage(null);

    setIsOpenAlert(true);
    setAlertaExito(true);
    setAlertaMensaje('Se reestablecieron los campos');
    setRegistroValido(true);

  }

  return (
    <div className='h-screen flex flex-col justify-between'>
      <NavBar />
      <div className='px-6 py-6 text-textoCard'>
        <button className='bg-fondoBoton rounded-lg md:w-auto min-w-28 px-2 mb-2 py-1 text-white font-semibold text-xl hover:bg-orange-400 hover:text-white' onClick={handleCancelarClik}>Volver</button>
        <form className="mx-auto bg-fondoCard h-auto py-4 px-4 rounded-xl flex flex-col drop-shadow-md max-w-2xl">
          <h2 className='py-4 font-bold text-3xl text-center'>Ingresa los nuevos datos del bus</h2>
          <div className='flex flex-col mt-2'>
            <div className="mb-5">
              <label className=' text-xl font-semibold'>Nombre del Bus</label>
              <input
                type="text"
                value={busName}
                onChange={handleChangeName}
                onBlur={validarRegistro}
                className={`text-lg border placeholder:text-md placeholder:font-semibold  placeholder-white rounded-lg block w-full p-2.5 ${busNameError ? 'text-red-500 border-red-500 focus:outline-red-600' : ''}`}
                placeholder="Bus Institucional"
              />
              {busNameError && <p className="text-red-500">{busNameError}</p>}
            </div>
            <div className="mb-5" >
              <label className='text-xl font-semibold'>Matrícula</label>
              <input
                type="text"
                id="matricula"
                value={matriculaDisplay}
                onChange={handleChangeMatricula}
                onBlur={validarRegistro}
                className={`text-lg border placeholder:text-md placeholder:font-semibold placeholder-white rounded-lg block w-full p-2.5 form-input ${matriculaError ? 'border-red-500 text-red-500 focus:outline-red-600 ' : ''}`}
                placeholder="XX-XX-00 u XX-00-00"
              />
              {matriculaError && <p className="text-red-500">{matriculaError}</p>}
            </div>
            <div className="mb-5">
              <label className='text-xl font-semibold'>Adjuntar Imagen</label>
              <UploadImage
                selectedImage={selectedImage}
                imageRef={imageRef}
                handleChangeImage={handleChangeImage}
                handleClearImage={handleClearImage}
                errorMessage={errorImagen}
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <label className='text-xl font-semibold' >Estado del Bus</label>
              <Checkbox isChecked={isChecked} onChange={setIsChecked} />
            </div>
            <div className='flex flex-row justify-between mt-6'>
              <div>
                <button className='bg-red-500 rounded-lg px-6 py-1 text-white font-semibold md:text-xl hover:bg-red-400 hover:text-white' onClick={handleLimpiarClick}>Limpiar</button>
              </div>
              <div>
                <button
                  className='bg-[#DDDDDD] rounded-lg px-6 py-1 font-semibold md:text-xl hover:bg-[#CCCCCC] '
                  onClick={handleResetForm}
                >
                  Reestablecer
                </button>
              </div>
              <div className='text-white'>
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
        <Alerta isOpen={isOpenAlert} onClose={handleCloseAlerta} isSuccess={alertaExito} mensaje={alertaMensaje} />
      </div>
      <Footer />
    </div>
  );
}
