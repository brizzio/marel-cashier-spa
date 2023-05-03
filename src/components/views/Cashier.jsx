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
import DisplayList from '../displays/DisplayList'
import PayCash from './PayCash'
import PayBancomat from './PayBancomat'
import Bags from '../common/Bags'
import ProductSelector from './productSelector'



function Cashier() {

  const [quantity, setQuantity] = usePersistentContext('quantity')
  const [search, setSearch] = usePersistentContext('search')
  const [readed, setReaded] = usePersistentContext('readed')  
  const [swap=false, setSwap] = usePersistentContext('swap')

  const [view = 0, setView] = usePersistentContext('view')

  const {
    newCart,
    addFiscalCode,
    removeItemByKey,
    searchCode,
    addItemByCode,
    deleteCart,
    formatDate,
    sumArrayByProp, 
    setPaymentMode,
    resetPaymentMode,
    isPaymentModeOn,
    currentCart
} = useCart()

  const handleChangeView = (v)=>{

    console.log('handleChangeView', v)

    switch (v) {
        case 1:
            setPaymentMode('cash')
            break;
        case 2:
            setPaymentMode('bancomat')
            break;
        case 3:
            setPaymentMode('bonus')
            break;
        case 4:
            setPaymentMode('other')
            break;

        case 5:
            productSelection()
            break
    
        default:
            resetPaymentMode()
            break;
    }
    setView(v)
  }

 


  const productSelection = () =>{

        console.log('product selecion')

  }

  const handleResetView = ()=>handleChangeView(0)

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

  const itemsCount = currentCart?currentCart.count:0
  const cartWeight = currentCart?currentCart.weight?.toFixed(2) + " Kg":"0.00 Kg"
  const cartTotal = currentCart?currentCart.total?.toFixed(2):"0.00"
  
  console.log('isPaymentModeOn view', isPaymentModeOn , view)
  
  return (

    

    <div className="relative min-h-full h-screen flex items-center justify-center pt-14 pb-10 mx-2 px-2 sm:px-6 md:px-3 lg:px-8" >
    <div className={`flex flex-row h-full w-full  rounded-lg items-center justify-center gap-[1rem] ${swap?'flex-row-reverse':''}`} >
      
        <div className="flex flex-col h-full w-1/2 items-start justify-start">

            <div className="flex h-[6rem] w-full items-center justify-start gap-3 ">

                <div className="flex h-full border rounded-xl bg-zync-300 shadow-lg w-2/12  items-center justify-center">
                    <i className="fa-solid fa-2x fa-cart-arrow-down pl-2 "></i>
                    <span className="text-4xl font-thin px-2 mb-2">{itemsCount}</span>
                </div>

                <div className="flex h-full border rounded-xl bg-zync-300 shadow-lg w-4/12  items-center justify-center">
                    <i className="fa-solid fa-weight-scale fa-2x pl-2"></i>
                    <span className="text-4xl font-thin p-[1rem] mb-2 leading-1 px-2 ml-2">{cartWeight}</span>
                </div>

                <div className="flex h-full border rounded-xl bg-zync-300 shadow-lg w-4/12 items-center justify-start">
                <span className="text-5xl font-bold pl-2 mb-2">€</span>
                <span className="text-5xl font-thin pr-2 mb-2 text-end  w-full">{cartTotal}</span>
                </div>
                <button className=" flex items-center justify-center border  rounded-xl  border-zinc-300 text-4xl font-semibold shadow-md h-full w-2/12"
                onClick={()=>setSwap(!swap)}
                >
                    <i className="fa-solid fa-chevron-left text-teal-600 fa-xl"></i>
                    <i className="fa-solid fa-chevron-right text-teal-600 fa-xl"></i>
                </button>

            </div>

            <div className="flex h-5/6 border rounded-xl bg-zync-300 shadow-lg w-full mt-4 items-start justify-start ">
                {!isPaymentModeOn && <DisplayList />}
                {isPaymentModeOn && view == 1 && <PayCash value={currentCart.total} />}
                {isPaymentModeOn && view == 2 && <PayBancomat value={currentCart.total} />}
                {view==5 && <ProductSelector close={handleResetView}/>}
            
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

            <div className="flex h-full  rounded-xl   w-full mt-4 items-start justify-between gap-2 ">

                <div className="flex flex-col items-end justify-start gap-3 h-full w-3/12 mt-2 mr-2">
                    
                    <SideButton face=""
                                view={1} /* set payment_type as cash */
                                faIcon='fa-solid fa-hand-holding-dollar fa-2x text-zinc-400'  
                                action={handleChangeView}
                                isClicked={isPaymentModeOn && view == 1} />
                    <SideButton face=""
                            view={2}  /* set payment_type as bancomat */
                            faIcon='fa-solid fa-credit-card fa-2x text-zinc-400'  
                            action={handleChangeView}
                            isClicked={isPaymentModeOn && view == 2} />
                    <SideButton face=""
                            view={3}/* set payment_type as bonus */
                            faIcon='fa-solid fa-gifts fa-2x text-zinc-400'  
                            action={handleChangeView}
                            isClicked={isPaymentModeOn && view == 3} />
                    <SideButton face=""
                            view={4}/* set payment_type as other */
                            faIcon='fa-solid fa-money-check-dollar fa-2x text-zinc-400'  
                            action={handleChangeView}
                            isClicked={isPaymentModeOn && view == 4} />
                    <button className={`flex items-center justify-center border  rounded-xl border-zinc-300 text-2xl font-thin shadow-md p-4 w-full h-[5.3rem]`}
                    onClick={()=>deleteCart()}>
                    <i className="fa-regular fa-rectangle-xmark fa-2x text-red-400"></i>
                    </button>
                </div>

                <div className="flex flex-col items-center justify-start gap-3  h-full w-6/12">
                <NumericKeyboard />
                <button className={`flex items-center justify-center border  rounded-xl border-zinc-300 shadow-md  w-full h-[5.3rem] gap-2 ${view==5?'bg-teal-600  rounded-xl':''}`}
                disabled ={!currentCart?.active}
                onClick={()=>handleChangeView(5)}
                >
                   <i className="fa-solid fa-cheese fa-2x text-zinc-600 "></i>
                   <i className="fa-solid fa-bottle-water fa-3x text-zinc-600"></i>
                   <i className="fa-solid fa-ice-cream fa-2x text-zinc-600"></i>
                </button>
                </div>

                <div className="flex flex-col items-end justify-start gap-3 h-full w-3/12 mt-2 mr-2">
                    <ButtonDisableOnClick face="nuovo"
                            icon="new.png" 
                            action={handleNewCartButtonClick}
                            isClicked={currentCart?.active}
                            release={currentCart?.active} />
                    <Button face="quantitá"
                            //icon="quantity.png"
                            faIcon="fa-solid fa-cubes-stacked fa-2xl text-zinc-400"
                            action={handleQuantityButtonClick}
                            isClicked={quantity?.type == 'manual' && !!quantity?.edit} />
                    <Button face="cerca"
                            //icon="search.png"
                            faIcon="fa-solid fa-magnifying-glass fa-2xl text-zinc-400"  
                            action={handleSearchButtonClick}
                            isClicked={search?.active} />
                    <div className={`flex items-center justify-center   text-2xl font-thin  p-4 w-full h-[11.5rem]`}>
                        <Bags />
                    </div>
                   
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
    faIcon,
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
        <button className={`flex items-center justify-center border  rounded-xl border-zinc-300 text-2xl font-thin shadow-md p-4 w-full h-[5.3rem]
        ${clicked
        ?'bg-teal-500 text-white'
        :''}
        `}
        onClick={click}>
            {icon
            ?<img className="h-[3rem]" src={'/' + icon}/>
            :faIcon
            ?<i className={faIcon}></i>
            :face.toUpperCase()}
        </button>
    )

}


// eslint-disable-next-line react/prop-types
const SideButton = ({
    face,
    icon,
    faIcon,
    view,
    bg='white',
    action,
    isClicked
}) =>{

    const [clicked, setClicked] = React.useState(isClicked)

    React.useEffect(()=>setClicked(isClicked),[isClicked])

    const click = () =>{
        console.log('clicked', face)
        let state = !clicked
        setClicked(state)
        action(view)
    }

    return (
        <button className={`flex items-center justify-center border  rounded-xl border-zinc-300 text-2xl font-thin shadow-md p-4 w-full h-[5.3rem]
        ${clicked
        ?'bg-teal-500 text-white'
        :''}
        `}
        onClick={click}>
            {icon
            ?<img className="h-[3rem]" src={'/' + icon}/>
            :faIcon
            ?<i className={`${faIcon}${clicked?'text-white':''}`}></i>
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
    

    const click = () =>{
        console.log('clicked', face)
        setClicked(true)
        setDisabled(true)
        action()
    }

    return (
        <button className={`flex items-center justify-center border  rounded-xl border-zinc-300 text-2xl font-thin shadow-md p-4 w-full h-[5.3rem]
        ${clicked
        ?'bg-teal-600 text-white'
        :''}
        `}
        disabled={clicked}
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

const ButtonCloseCart = ({
    face,
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
        <button className={`flex items-center justify-center   rounded-xl shadow-md  h-[5rem] w-full bg-indigo-600 text-white 
        ${clicked
        ?'bg-indigo-700 text-white'
        :''}
        `}
        disabled={disabled}
        onClick={click}>
            {clicked
                ?<div className="flex w-full items-center justify-center">
                    <BouncingDotsLoader/>
                </div>
                :<i className="fa-solid fa-3x fa-hand-holding-dollar"></i>
            }
        </button>
    )
}