import React, { useState } from 'react';
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import BusListado from '../components/BusListado'
import { MdAddCircle } from "react-icons/md";

export default function ListadoBuses() {

    const [buses, setBuses] = useState([
        { nombre: 'Bus 1', patente: 'XX2222' },
        { nombre: 'Bus 2', patente: 'XXXX22' },
        { nombre: 'Bus 3', patente: 'XX3311' },
        { nombre: 'Bus 4', patente: 'XX3322' },
      ]);

    const handleAgregarBus = () => {
        console.log('Quiero Agregar Bus');
    };

    return (
      <div className='h-screen flex flex-col justify-between'>
        <NavBar />
            <div className='content-center h-full'>
                <div className='px-4 text-textoCard mx-auto bg-fondoCard rounded-xl flex flex-col items-center drop-shadow-md max-w-3xl h-5/6'>
                    <div className=' py-6 '> 
                        <span className='font-bold text-3xl text-center'>Listado de Buses</span>
                    </div>
                    <div className='w-full overflow-y-auto max-h-[55vh]'>
                        {buses.map((bus, index) => (
                            <BusListado key={index} nombreBus={bus.nombre} patenteBus={bus.patente} />
                            ))}
                        <div className='w-full flex justify-center mt-3 px-2 mb-4'>
                            <div className='bg-gray-300 py-2 w-full flex justify-center rounded-xl'>
                                <div className='flex flex-col justify-center items-center'>
                                    <button> <MdAddCircle className='text-6xl' onClick={handleAgregarBus} /> </button>
                                    <span className='font-semibold' >Agregar Bus</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <Footer />
      </div>
    );
  }