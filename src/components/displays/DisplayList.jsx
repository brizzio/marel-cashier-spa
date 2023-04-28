/* eslint-disable no-unused-vars */


import React from 'react'
import PropTypes from 'prop-types';
import useCart from '../../hooks/useCart';
import usePersistentContext from '../../hooks/usePersistentContext';



const removeItemFromCart= (e)=>{
    console.log('event.currentTarget.dataset.id', e.currentTarget.id); // >> id
}



const RenderListItem = ({item}) => {
    //console.log('list item: ', item)

    //console.log('index', index.toString())

    var total = parseFloat(item.calculatedPrice)

    return (
    <div className='flex flex-row py-3 px-3 py-0.5 items-center justify-between text-lg text-gray-900 border-b border-gray-400'>
        <div className='flex flex-row items-center'>
            <span className="font-semibold">{item.promo_type>0?"P":"R"}</span> 
            <span className="px-2">{item.upc}</span> 
            <span className="px-2 truncate w-[10rem]">{item.product_name}</span> 
                
            <span className="px-2">{item.weight}</span><span>{item.weight_unit}</span>          
        </div>  
        <div className="py-1 px-1">
            <div className="flex flex-row py-1 px-1 items-center gap-3">
            <span>
            {`( ${item.order} ) `}    
            </span>
            <div className="flex items-center gap-0.5">
                <span className="font-bold">{item.currency}</span>
                <span className="text-2xl">{item.calculated_price.toFixed(2)}</span>
            </div>
            
            
            <button id={item.entryID} 
                    onClick={event=>removeItemFromCart(event)}>
                <i className="fa-regular fa-trash-can text-red-300 fa-xl"></i>
            </button>
            </div>          
        </div>
    </div>
    )
}

RenderListItem.propTypes = {
    item:PropTypes.object
}





const DisplayList = () => {

    
   
    const [currentCart, setCurrentCart] = usePersistentContext('currentCart')

    const cart = useCart()

    const [list, setList]= React.useState([])
    
    React.useEffect(()=>{

        console.log('display list use effect', currentCart?.items)
        setList(currentCart?.items)
    
    },[currentCart])
    
    

   

  return (
    
    

       
        <div id="list" className={`flex flex-col w-full h-full `}>
            {/* <div id="table-header" className='flex flex-row items-center justify-between py-2 px-3 text-xs border rounded-md border-indigo-400' >
                <div>
                    <span className="px-2">CARRELLO SPESA</span>
                    <span className="px-2">Data: 26/12/2022</span> 
                    <span className="px-2">Cliente: 58659</span>  
                    <span className="px-2">Ora Inizio: 12:51:30</span>  
                </div>  
            </div>  */}
            {
                currentCart?.items.lenght?
                <div>In attesa dello scanner...</div>:
                <div id="table-body" className='flex flex-col h-{8rem} overflow-y-scroll [&::-webkit-scrollbar]:hidden px-2'>
                {currentCart?.items.map(function(i, idx){
                    return (<RenderListItem key={idx} item={i} />)
                })}
                </div>
            }
            
        </div>
        
    
    
  )
}

DisplayList.propTypes = {
    item:PropTypes.object
}

export default DisplayList