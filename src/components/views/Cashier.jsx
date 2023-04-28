/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import IdiomSelector from '../common/IdiomSelector'
import BizerbaLogoSVG from '../common/BizerbaLogoSVG'
import Webc from '../../utils/Webc'
import UpcScreen from '../displays/UpcScreen'
import NumericKeyboard from '../common/NumericKeyboard'
import usePersistentContext from '../../hooks/usePersistentContext'
import useCart from '../../hooks/useCart'
import BouncingDotsLoader from '../../utils/BouncingDotsLoader/BouncingDotsLoader'


function Cashier() {

  const [quantity, setQuantity] = usePersistentContext('quantity')
  const [search, setSearch] = usePersistentContext('search')
  const [readed, setReaded] = usePersistentContext('readed')  
  const {
    newCart,
    addFiscalCode,
    removeItemByKey,
    searchCode,
    addItemByCode,
    deleteCart,
    formatDate,
    sumArrayByProp, 
    currentCart
} = useCart()

  const handleQuantityButtonClick = (clicked) =>{
    console.log('handle clicked', clicked)
    const q = clicked
    ?{type:'manual', value:'', edit:true}
    :{type:'auto', value:1, edit:false}
    setQuantity(q)
    setReaded({})
  }  

  const handleSearchButtonClick = (clicked) =>{
    console.log('handle clicked', clicked)
    const q = clicked
    ?{active:true, find:'', found:false}
    :{active:false, find:'', found:false}
    setSearch(q)
    setReaded({})
  }  

  const handleNewCartButtonClick = () => newCart()


  
  
  
  return (

    

    <div className="relative min-h-full h-screen flex items-center justify-center pt-14 pb-10 mx-2 px-2 sm:px-6 md:px-3 lg:px-8" >
    <div className="flex flex-row h-full w-full  rounded-lg items-center justify-center gap-[1rem]" >
      
        <div className="flex flex-col h-full w-1/2 items-start justify-start">

            <div className="flex h-[6rem] w-full items-center justify-start gap-3 ">

                <div className="flex h-full border rounded-xl bg-zync-300 shadow-lg w-2/12  items-center justify-center">
                    <i className="fa-solid fa-2x fa-cart-arrow-down pl-2 "></i>
                    <span className="text-5xl font-thin px-2 mb-2">7</span>
                </div>

                <div className="flex h-full border rounded-xl bg-zync-300 shadow-lg w-4/12  items-center justify-center">
                    <i className="fa-solid fa-weight-scale fa-2x pl-2"></i>
                    <span className="text-4xl font-thin p-[1rem] mb-2 leading-1 px-2">18.50</span>
                </div>

                <div className="flex h-full border rounded-xl bg-zync-300 shadow-lg w-4/12 items-center justify-start">
                <span className="text-5xl font-bold pl-2 mb-2">€</span>
                <span className="text-4xl font-thin pr-2 mb-2 text-end  w-full">125,50</span>
                </div>
                <button className=" flex items-center justify-center border  rounded-xl  border-zinc-300 text-4xl font-semibold shadow-md h-full w-1/12 px-7"
                >0</button>

            </div>

            <div className="flex h-full border rounded-xl bg-zync-300 shadow-lg w-full mt-4 items-center justify-start ">
                <span className="text-2xl font-bold p-[1rem] mb-2">list</span>
            
            </div>
        </div>
        {/* second part of view.... the right part */}
        <div className="container flex flex-col h-full w-1/2 items-start justify-start">

            <div className="flex h-[8rem] w-full items-center justify-start gap-[1rem]  ">

                <div className="flex flex-col w-3/12 items-center justify-center -ml-4">
                <Webc id="webimage" />
                </div>

                <UpcScreen />

            </div>

            <div className="flex h-full border rounded-xl bg-zync-300 shadow-lg w-full mt-4 items-center justify-start ">

            <div className="flex flex-col gap-2 border border-black h-full w-3/12">
                <div>quantity</div>
                <div>search</div>
            </div>

            <NumericKeyboard />

            <div className="flex flex-col items-end justify-start gap-2 border border-black h-full w-2/12">
                <ButtonDisableOnClick face="nuovo"
                        icon="new.png" 
                        action={handleNewCartButtonClick}
                        isClicked={currentCart?.active}
                        release={currentCart?.active} />
                <Button face="quantitá"
                        icon="quantity.png" 
                        action={handleQuantityButtonClick}
                        isClicked={quantity?.type == 'manual' && !!quantity?.edit} />
                <Button face="cerca"
                        icon="search.png"  
                        action={handleSearchButtonClick}
                        isClicked={search?.active} />
            </div>
            
            </div>
        </div>
       
     
    </div>
      
    
    <img  className=" absolute top-0 left-0 p-3 h-14 z-10" src='/marel-logo.png'/>
    <IdiomSelector cn="absolute top-0 right-0 pt-3"/>
    <BizerbaLogoSVG cn="absolute bottom-0 right-0 pr-3"/> 
   

    </div>
    
  
   
    
    
  )
}

export default Cashier

// eslint-disable-next-line react/prop-types
const Button = ({
    face,
    icon,
    bg='white',
    action,
    isClicked
}) =>{

    const [clicked, setClicked] = React.useState(false)

    React.useEffect(()=>setClicked(isClicked),[isClicked])

    const click = () =>{
        console.log('clicked', face)
        let state = !clicked
        setClicked(state)
        action(state)
    }

    return (
        <button className={`flex items-center justify-center border  rounded-xl border-zinc-300 text-2xl font-thin shadow-md p-4 w-full
        ${clicked
        ?'bg-teal-500 text-white'
        :''}
        `}
        onClick={click}>
            {icon
            ?<img className="h-[3rem]" src={'/' + icon}/>
            :face.toUpperCase()}
        </button>
    )

}

// eslint-disable-next-line react/prop-types
const ButtonDisableOnClick = ({
    face,
    icon,
    bg='white',
    action,
    isClicked,
    release
}) =>{

    const [clicked, setClicked] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)

    React.useEffect(()=>setClicked(isClicked),[isClicked])
    React.useEffect(()=>{
        !isClicked && release
        ?setDisabled(release)
        :''
    },[release])

    const click = () =>{
        console.log('clicked', face)
        setClicked(true)
        setDisabled(true)
        action()
    }

    return (
        <button className={`flex items-center justify-center border  rounded-xl border-zinc-300 text-2xl font-thin shadow-md p-4 w-full
        ${clicked
        ?'bg-teal-600 text-white'
        :''}
        `}
        disabled={disabled}
        onClick={click}>
            {icon
            ?clicked
                ?<div className="flex w-full items-center justify-center">
                    <BouncingDotsLoader/>
                </div>
                :<img className="h-[3rem]" src={'/' + icon}/>
            :face.toUpperCase()}
        </button>
    )

}