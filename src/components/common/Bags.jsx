/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React , {useState, useEffect}from 'react'
import useCart from '../../hooks/useCart'




const Bags = () => {

   
    
  
    const {currentCart, updateBags } = useCart()
    
 console.log('bacurrentCart', currentCart)
    
   
    const bags = currentCart? currentCart.bags : 0

    async function increment () {
        //setCount(prevCount => prevCount+=1);
        if(currentCart.active) {
           await updateBags('add')
        }
        
      }
  
    async function decrement() {

        if(currentCart.active){
          await updateBags('remove')
        }        
    }

     
  return (
    <div className='flex flex-col items-center text-xl   h-fit py-1 px-1  '>
         <button onClick={increment}>
            <i className="fa-solid fa-chevron-up fa-3x text-teal-700"></i>
        </button>
      <div className={`flex w-[6rem] items-center`}>
        <i className="fa-solid fa-bag-shopping fa-3x text-zinc-500"></i>
        <span className={`text-5xl font-thin pl-3 text-teal-700`}>{bags}</span>
      </div>
        


        <button onClick={decrement}>
            <i className="fa-solid fa-chevron-down fa-3x text-teal-700"></i>
        </button>
    </div>
  )
}

export default Bags