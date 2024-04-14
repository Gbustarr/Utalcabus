import React from 'react'

function Footer() {
  return (
    <div className="bg-black h-16 md:h-20 xl:h-24 flex items-center justify-center text-white font-bold text-2xl">
        © {new Date().getFullYear()} Utalca-Bus.
    </div>
  )
}

export default Footer