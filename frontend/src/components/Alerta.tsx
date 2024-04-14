import React, {Fragment, useRef, useEffect } from 'react';
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
interface AlertaProps {
    isOpen: boolean;
    onClose: () => void;
    isSuccess: boolean;
    mensaje: string;
}

function Alerta({isOpen,onClose,isSuccess,mensaje}: AlertaProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
        
    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        }
    }, [isOpen, onClose]);

    const handleClose = () => {
        dialogRef.current?.close();
        onClose();
    };
    
    return (
        <>
        <Fragment>
                {isOpen &&
                    <dialog
                        ref={dialogRef}
                        className='bg-fondoCard flex justify-center flex-col items-center px-6 py-6 rounded-2xl text-textoCard min-w-80'
                    >
                        <div className='flex flex-col items-center justify-center'>
                            {isSuccess ? <FaRegCheckCircle className="text-green-500 h-20 w-20 mb-2" /> : <FaRegTimesCircle className="text-red-500 h-20 w-20 mb-2" />}
                            <p className="text-xl font-bold mb-6">{isSuccess ? 'Exito' : 'Error'}</p>
                            <p className="text-lg">{mensaje}</p>
                            <button onClick={handleClose} className='bg-fondoBoton text-white text-xl px-8 py-2 rounded-xl mt-6'>
                                Cerrar
                            </button>
                        </div>
                    </dialog>
                }
        </Fragment>
        </>
    )
}

export default Alerta