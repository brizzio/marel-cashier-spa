/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import useSelection from '../../hooks/useSelection'



const ProductSelector = ({close}) => {


const [list, setList] = React.useState([])
const [item, setItem] = React.useState({})

const {
    addSelectedItemToCart,
    detachedList
} = useSelection()


React.useEffect(()=>{
    setList(detachedList)
},[])

 const handleClose = () =>{

    console.log('closing selector')
    close()

 }

 const handleCloseProductView = () =>{

    console.log('closing product view')
    setItem({})

 }

 const handleSetItem = (selection) =>{

    console.log('setting item')
    setItem(selection)
   

 }

 const handleConfirm = () =>{

    console.log('confirm item')
    addSelectedItemToCart(item)
    close()
   

 }

 
if (JSON.stringify(item) !== '{}') return      <Product  
item={item} 
confirm = {handleConfirm}
close={handleCloseProductView} />


  return (
    
    <Products 
    list={list} 
    close={handleClose} 
    set={handleSetItem}/>
          
  )
}

export default ProductSelector


const Product = ({item = {},confirm, close}) =>{


    const confirmSelection = () => {

        console.log('confirm', item)
        confirm()
        
    }

    const handleClose = () => close()

    return(
    
        <div  className={`relative flex flex-col w-full h-full max-h-[30rem] border rounded-lg  shadow-md mt-1 items-center justify-center mt-4`}>
               
            <img  className="object-contain h-1/2 w-1/2  " src={item.image}/>
                          
            <p className='w-1/2 h-fit px-2 line-clamp-3 leading-8 text-3xl  text-center py-2'>{item.product_name}</p>

                <p className='w-[8rem] text-center text-4xl'>{item.currency}{item.calculated_price.toFixed(2)}</p>
                            
            
            <button className={`absolute z-90 top-2 right-4`}
            onClick={handleClose}>
                <i className="fa-solid fa-xmark text-red-600 fa-4x"></i>
            </button>


            <button className={`absolute z-90 bottom-2 right-2 bg-green-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl  drop-shadow-2xl animate-bounce duration-300`}
            onClick={confirmSelection}>
                <i className="fa-solid fa-check text-white fa-xl"></i>
            </button>
        </div>
    
    )

}


const Products = ({list = [], close, set}) =>{

   
    const [product, setProduct] = useState({})


    
    


    const Item = ({e}) => {

       
        
        const handleClick = () => {
            
            console.log('clicked', e)

            set(e)
           
        }
        
        

        return (
           
            <button  className={`relative flex flex-col w-[8rem] h-[12rem] border rounded-lg  shadow-md mt-1 justify-center`}
            onClick={handleClick}
            >
               <div className={`flex items-center justify-center p-2`}>
                <img  className="object-contain h-[6rem] w-[8rem] " src={e.image}/>
               </div>
               <p className='w-[7rem] mx-2 line-clamp-2 leading-3'>{e.product_name}</p>
                <p className='w-[8rem] text-center text-2xl'>{e.currency}{e.calculated_price.toFixed(2)}</p>
                            
            </button>
             
             
            )

    }

    return(

    <div className="relative flex flex-wrap h-full w-full justify-center rounded-lg shadow-xl mt-8 gap-6 overflow-y-scroll [&::-webkit-scrollbar]:hidden px-2">
        {
            list.map((e,i)=><Item e={e}  key={i}  />)
        }
       
    </div>




        

    )


}