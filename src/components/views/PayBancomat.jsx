/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import Button from '../../customUi/Button'

const PayBancomat = ({value, onCancel}) => {

    function exit(){
        console.log('exit')
         onCancel()
     }

    return(
    <>
    <div className="flex flex-row h-full w-full ">
      <div className="flex flex-col h-fit w-fit  justify-center">
       
      
        <i className={`fa-solid fa-credit-card fa-3x p-4 `}></i>
        <h5 className="w-5/6 ml-4 text-xl text-center break-words	font-semibold  text-gray-900">{'Bancomat'}</h5> 
    
    
        
        {/* <h5 className="w-5/6 border-2 ml-4 text-xl text-center break-words	font-semibold  text-gray-900 dark:text-white">hello</h5> */}


        <div className="flex flex-col mt-6 ">
          <div className="mt-2">
            <label className=" ml-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Totale Spesa</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl font-semibold text-right rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 ml-4 p-3 " value={parseFloat(value).toFixed(2)} readOnly/>
          </div>
          <div className="mt-2">
            <label className=" ml-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Incasso</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl font-semibold text-right rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 ml-4 p-3 " placeholder="0.00" required/>
          </div>
          <Button variant="primary" size="small" className="h-10 w-5/6 mb-1  mt-6 ml-3" onClick={()=>console.log('props.handler()')}>FINALIZZA</Button>
          <Button variant="primary" size="small" className="h-10 w-5/6 mb-1  mt-6 ml-3" onClick={exit}>CANCELLA</Button>
        </div>
      </div>
      <div className="flex flex-col h-full w-full items-center">
          <img className="w-[22rem] h-auto justify-center" src={'/pos.gif'} alt='Profile'/>
          
      </div>
    </div>
    </>

    )
}

export default PayBancomat