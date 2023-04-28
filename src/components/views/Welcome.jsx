/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import BizerbaLogoSVG from '../common/BizerbaLogoSVG';
import IdiomSelector from '../common/IdiomSelector';
import usePersistentContext from '../../hooks/usePersistentContext';

import useTimeZoneDate from '../../hooks/useTimeZoneDate';
import useScanner from '../../hooks/useScanner';


function Welcome(){


   //const [order, setOrder] = usePersistentContext('order')
   const [cashier, setCashier] = usePersistentContext('cashier')
   const { initialize } = useScanner()

   const date = useTimeZoneDate()

   const startCashier = ()=>{
    console.log('cashier start')
    initialize()
    setCashier({...cashier, initialized:true})
  }
  

  //if(!!order && JSON.stringify(order) !== '{}') return(<Main />)


  return (
    <div className="relative min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 md:px-3 lg:px-8" >
    <div className="flex flex-col h-[38rem] w-full py-20 rounded-lg items-center justify-center gap-8" >
      <div className=" px-6">
        <h2 className="text-4xl font-bold mb-2">
          utente registrato
        </h2>
        <div className="  bg-zync-200">
          <div className="min-h-[14rem] border border-zync-300 p-[2rem] rounded-xl shadow-xl">
            <span className="text-2xl font-semibold">operatore:</span>
            <span className="text-2xl font-thin mx-3">{cashier.user.first_name}</span>

          </div>
          
        </div>
        
       
      </div>

      <button className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider"
      onClick={startCashier}
      >
          INIZIA IL CASSA
        </button>
     
    </div>
    {/* //Absolute positioned elements */}
    <img  className=" absolute top-0 left-0 p-3 h-14 z-10" src='/marel-logo.png'/>
    <IdiomSelector cn="absolute top-0 right-0 pt-3"/>
    <BizerbaLogoSVG cn="absolute bottom-0 right-0 pr-3"/> 
    </div>
  )
}

export default Welcome