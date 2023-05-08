/* eslint-disable no-unused-vars */
import React from 'react'

const Controls = () => {
  return (
    <div className="flex h-full w-full  grid grid-cols-2 gap-4 p-4">
    <button  className= "w-full h-full border border-zinc-300 rounded-xl shadow-xl text-3xl bg-purple-300 text-teal-700">Chiudi Cassa</button>
    <button  className= "w-full h-full border border-zinc-300 rounded-xl shadow-xl text-3xl  bg-yellow-300 ">
        <div className="mx-auto line-clamp-2 text-teal-700">Area Amministrativa</div>
    </button>
    <button  className= "w-full h-full border border-zinc-300 rounded-xl shadow-xl text-3xl bg-sky-600 text-teal-200">Chiudi Cassa</button>
    <button  className= "w-full h-full border border-zinc-300 rounded-xl shadow-xl text-3xl  bg-green-300 ">
        <div className="mx-auto line-clamp-2 text-teal-700">Area Amministrativa</div>
    </button>
    
    
    </div>

  )
}

export default Controls