/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react'
import BouncingDotsLoader from '../../utils/BouncingDotsLoader/BouncingDotsLoader'
import usePersistentContext from '../../hooks/usePersistentContext'

const UpcScreen = () => {



const [activeClass, setActiveClass] = React.useState('')
const [activeSearchClass, setActiveSearchClass] = React.useState('')
const [readed] = usePersistentContext('readed')
const [quantity] = usePersistentContext('quantity')
const [search] = usePersistentContext('search')
const [currentCart] = usePersistentContext('currentCart')

const [showQuantity, setShowQuantity] = React.useState('')
const [code, setCode] = React.useState('')

React.useEffect(()=>{
    //console.log('quantity type', quantity?.type, quantity?.type == 'manual')
    
    let qt = quantity?.value?quantity?.value:'_'
    let c = search?.active?search?.find:readed?.inputCode
    setShowQuantity(qt)
    setCode(c)


    if(quantity?.type == 'manual' && quantity?.edit){
        setActiveClass('outline outline-zinc-200  rounded-xl shadow-lg px-2')
    }else{
        setActiveClass('')
    }

    if(search?.active){
        setActiveSearchClass('outline outline-zinc-200  rounded-xl shadow-lg px-2')
    }else{
        setActiveSearchClass('')
    }


    

},[readed, quantity, search])




  
  if(JSON.stringify(readed)=='{}' && quantity.edit && currentCart?.active ) return (
    <div className="flex h-full border rounded-xl bg-zync-300 shadow-lg w-9/12 items-center justify-start px-2">
        <span className={`flex items-center justify-center text-5xl font-semibold mx-2 w-fit h-5/6 text-zinc-400 ${activeClass}`}>{showQuantity}</span>
        <span className="text-5xl font-thin pl-2 mb-2 text-green-500">|</span>
        <span className="text-2xl font-thin pl-2 text-zinc-700">Modifica la quantita ...</span>
    </div>
  )

  if(JSON.stringify(readed)=='{}' && !quantity.edit && currentCart?.active) return (
    <div className="flex h-full border rounded-xl bg-zync-300 shadow-lg w-9/12 items-center justify-start px-2">
        <span className={`flex items-center justify-center text-5xl font-semibold mx-2 w-fit h-5/6 text-zinc-400`}>{showQuantity}</span>
        <span className="text-5xl font-thin pl-2 mb-2 text-green-500">|</span>
        <span className="text-2xl font-thin pl-2 text-zinc-700">Scannerizza ora ...</span>
    </div>
  )

  if(readed?.processed && currentCart?.active) return (
    <div className="flex h-full border rounded-xl bg-zync-300 shadow-lg w-9/12 items-center justify-start px-2">
        <span className={`flex items-center justify-center text-7xl font-thin mx-2 w-fit h-5/6 text-teal-700`}>{readed?.quantity.value}</span>
        <span className="text-5xl font-thin pl-2 mb-2 text-green-500">|</span>
        <span className="text-6xl font-thin pl-2 text-zinc-700">{readed?.code}</span>
    </div>
  ) 


  return (

    currentCart?.active && readed?.found
    ?<div className="flex h-full border rounded-xl bg-zync-300 shadow-lg w-9/12 items-center justify-start px-2">
        <span className={`flex items-center justify-center text-5xl font-semibold mx-2 w-fit h-5/6 text-teal-700 ${activeClass}`}>{showQuantity}</span>
        <span className="text-5xl font-thin pl-2 mb-2 text-green-500">|</span>
        <span className={`flex items-center h-5/6 text-5xl font-thin ml-3 text-start  w-full ${activeSearchClass}`}>{code}</span>
    </div>
    :
    <Wrapper>
      {!currentCart?.active
      ?<span className="text-3xl font-thin pl-2 mb-2 text-zinc-700">In attesa di un nuovo cliente...</span>  
      :<span className="text-3xl font-thin pl-2 mb-2 text-zinc-700">Scannerizza i prodotti...</span>}
    </Wrapper>

    
  )
}

export default UpcScreen

const Wrapper = ({children}) =>{

    return(
    <div className="flex h-full border rounded-xl bg-zync-300 shadow-lg w-9/12 items-center justify-center">
        {children}
    </div>
    )
}