import React from 'react';

function Header() {
  return (
    <div className="bg-fondoHeader h-20 md:h-20 xl:h-24 flex items-center justify-left">
      <img className="h-16 w-auto ml-12 mr-4" src="https://www.utalca.cl/content/uploads/2019/04/Logo_White-1.svg" alt="Logo" />
      <div className="font-bold text-white text-xl">Bus Institucional</div>
    </div>
  );
}

export default Header;
