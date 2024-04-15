import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import Alerta from './Alerta';

type Props = {
    nombreBus: string;
    patenteBus: string;
}

function BusListado({nombreBus,patenteBus}: Props) {
    const [isAvailable, setAvailable] = useState(true);//es la disponibilidad del bus 
    const [errorOcurred, seterrorOcurred] = useState(false);//para comprobar si ocurrio un error al cambiar el estado
    const [isOpenAlerta, setIsOpenAlerta] = useState(false);//Para abrir la alerta
    const [alertaExito, setAlertaExito] = useState(true);//Para que sea la vista sea de exito/error
    const [alertaMensaje, setAlertaMensaje] = useState('');//Texto que acompaña a la alerta

    //con esta funcion se cambia habilitado/deshabilitado
    const toggleAvailability = () => {
        //se cambia a deshabilitado/habilitado
        setAvailable(!isAvailable);
        //se espera tener comprobacion de respuesta del backend aqui
        if(1>0){
            if(isAvailable===true){
                setAlertaExito(true);
                setAlertaMensaje('Has Deshabilitado el Bus: '+ nombreBus+ ' Patente: ' + patenteBus)
                setIsOpenAlerta(true);
            }
            else{
                setAlertaExito(true);
                setAlertaMensaje('Has Habilitado el Bus: '+ nombreBus+ ' Patente: ' + patenteBus)
                setIsOpenAlerta(true);
            }
        }
        else{
            setAlertaExito(false);
            setAlertaMensaje('Ha ocurrido un Error con tu solicitud');
            setIsOpenAlerta(true);
            seterrorOcurred(true)
        }
    };

    //gestiona si ocurre error 
    const handleError = () =>{
        if(errorOcurred===true){
            setAvailable(!isAvailable);
            seterrorOcurred(false);
        }
    };

    const handleEditBus = () => {
        console.log('Quiero editar el Bus: '+patenteBus);
    };

    const handleCloseAlerta = () => {
        setIsOpenAlerta(false);
        handleError();
    };

    return (
        <div className="px-2 py-2 flex flex-row items-center justify-center">
            <div className="px-3 py-3 bg-gray-300 rounded-lg flex flex-col md:flex-row w-full">
                <div className='flex flex-row w-full'>
                <div className={`h-20 w-20 rounded-2xl shadow-lg ${isAvailable ? '' : 'filter grayscale'}`}>
                        <img className="h-full w-full rounded-2xl" src="https://www.utalca.cl/content/uploads/2019/04/bus_curico_utalca.jpg"/>
                    </div>
                    <div className="px-5 flex flex-col text-gray-700 font-semibold items justify-center">
                        <span> Bus - {nombreBus} </span>
                        <span> Patente - {patenteBus} </span>
                        <span className={isAvailable ? 'text-gray-700' : 'text-red-500'}> Estado - {isAvailable ? "Habilitado" : "Deshabilitado"} </span>
                    </div>
                </div>
                <div className='flex flex-row'>
                    <div className='w-full flex mt-4 justify-center md:justify-between md:py-3 text-2xl md:text-lg'>
                        <button className='bg-blue-500 px-4 py-1 md:px-4 text-white md:mr-2 rounded-3xl flex flex-row items-center mx-2'onClick={handleEditBus}>
                            <FaEdit className='md:mr-2' />
                            <span className='hidden md:flex'>Editar</span>
                        </button>
                        <button 
                            className={`px-4 py-1 flex flex-row items-center rounded-3xl mx-2  ${isAvailable ? 'bg-red-500' : 'bg-green-500'} text-white`} 
                            onClick={toggleAvailability}
                        >
                            {isAvailable ? <><FaRegTimesCircle className='md:mr-2' /> <span className='hidden md:flex'>Deshabilitar</span></> 
                            : <><FaRegCheckCircle  className='md:mr-2' /> <span className='hidden md:flex' >Habilitar</span></>}
                        </button>
                    </div>
                </div>
            </div>
            <Alerta isOpen={isOpenAlerta} onClose={handleCloseAlerta} isSuccess={alertaExito} mensaje={alertaMensaje} />        
        </div>
    );
}

export default BusListado;
