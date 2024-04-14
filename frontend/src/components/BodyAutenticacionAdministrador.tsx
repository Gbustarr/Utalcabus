import React, { useState }  from 'react'
import validarRut from '../utils/validarRut';
import validarContraseña from '../utils/validarContraseña';
import validarUsuarioRegistrado from '../utils/validarUsuarioRegistrado';

function BodyAutenticacionAdministrador() {
  const [rut, setRut] = useState(''); // actualiza el valor de rut
  const [password, setPassword] = useState(''); // actualiza el valor de contraseña
  const [showNotificationUsuarioNoRegistrado, setShowNotificationUsuarioNoRegistrado] = useState(false);
  const [showNotificationContraseñaNoRegistrada, setShowNotificationContraseñaNoRegistrada] = useState(false);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }
  const handleRutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRut(event.target.value);
  } 

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    
    if(!validarUsuarioRegistrado(rut,password)){
      console.log('Usuario no registrado en plataforma');
      setShowNotificationUsuarioNoRegistrado(true);
      setTimeout(() => {
        setShowNotificationUsuarioNoRegistrado(false);
      }, 2000);
      return;
    }
    console.log('Rut:', rut);
    if (!validarRut(rut)) {//se debe verificar que la contraseña sea correcta
      console.log('Rut invalido');
      setShowNotificationUsuarioNoRegistrado(true);
      setTimeout(() => {
        setShowNotificationUsuarioNoRegistrado(false);
      }, 2000);
      return;
    }
    console.log('Rut valido');
    if(!validarContraseña(password)){//Verificar que la contraseña sea correcta;
      console.log('Contraseña invalida');
      setShowNotificationContraseñaNoRegistrada(true);
      setTimeout(() => {
        setShowNotificationContraseñaNoRegistrada(false);
      }, 2000);
      return;
    }

  
    console.log('Contraseña valida');
  

    
    console.log('Rut y Contraseña validos');

  };
  return (
    <div className='flex justify-center items-center h-full  '>
      <div className="w-96 h-96 max-xl bg-fondoTarjeta overflow-hidden shadow-md rounded-xl">
        <div className="flex flex-col justify-center items-center h-full">
          <form>
            <div className="px-6 py-4">
              <div className="flex flex-col justify-center items-center font-semibold text-2xl mb-9">Administrador</div>
              <input type="text"  value={rut} onChange={handleRutChange} className="w-full px-3 py-2 mb-4 placeholder-gray-400 text-gray-700 bg-white  shadow focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded-xl" placeholder="Rut: xxxxxxxx-x" required />
              <input type="password" value={password} onChange={handlePasswordChange} className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 bg-white  shadow focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded-xl" placeholder="Contraseña" required />
            </div>
            <div className=" flex flex-col justify-center items-center px-6 py-4">
              <button onClick={handleLogin} className=" bg-botonNaranja text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline-none focus:shadow-outline ">Iniciar Sesión</button>
            </div>
          </form>
        </div>
      </div>
      {showNotificationUsuarioNoRegistrado &&(
          <div className="fixed bottom-0 right-0 m-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded " role="alert">
          <strong className="font-bold">Usuario no registrado en plataforma</strong>
          <h1></h1>
          <span className="block sm:inline">Error de formato o usuario no registrado en plataforma</span>
        </div>
        )}
        {showNotificationContraseñaNoRegistrada &&(
          <div className="fixed bottom-0 right-0 m-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded " role="alert">
          <strong className="font-bold"> Contraseña no registrada en plataforma</strong>
          <h1></h1>
          <span className="block sm:inline">Error de formato o usuario no registrado</span>
        </div>
        )}
    </div>
    
    
  );
}

export default BodyAutenticacionAdministrador;
