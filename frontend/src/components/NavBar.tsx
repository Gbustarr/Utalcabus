import React from "react";
import { Link } from "react-router-dom";

type Props = {};

function NavBar({}: Props) {
  return (
    <div className=" bg-fondoHeader h-16 md:h-20 xl:h-24 text-white flex items-center justify-left text-3xl px-5 ">
      <Link to="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
          Utalca Bus
        </button>
      </Link>
    </div>
  );
}

export default NavBar;
