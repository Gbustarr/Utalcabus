import React, { useState, Button } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import BusListado from "../components/BusListado";
import { MdAddCircle } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

export default function TemporalRouter() {

  return (
    <div className="h-screen flex flex-col justify-between">
      <NavBar />
      <div className="content-center h-full">
        <div className="px-4 text-textoCard mx-auto bg-fondoCard rounded-xl flex flex-col items-center drop-shadow-md max-w-3xl h-5/6">
          <div className=" py-6 ">
            <span className="font-bold text-3xl text-center">
              Router Temporal
            </span>
          </div>
          <div className="w-full overflow-y-auto max-h-[55vh]">
            <div className="flex justify-center items-center ">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Autenticación Admin
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Listado Buses
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Registro Bus
              </button>
            </div>
            <div className="w-full flex justify-center mt-3 px-2 mb-4"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
