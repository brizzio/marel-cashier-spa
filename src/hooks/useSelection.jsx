/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'
import usePersistentContext from './usePersistentContext'
import useTimeZoneDate from './useTimeZoneDate'
import useLogger from './useLogger'
import { fetchQuery } from '../api/api'
import useCart from './useCart'






const useSelection = () => {
    //const [code, setCode] = useState('')
    //            const [found, setFound] = useState({})
    
    const {currentCart, addItemToCartByReference} = useCart()
    const [cashier, setCashier] = usePersistentContext('cashier')
    const [quantity, setQuantity] = React.useState(1)
    const [product, setProduct] =React.useState({})
    const [detachedList, setDetachedList] =React.useState({})

    const prices = React.useRef()

    React.useEffect(()=>{
      prices.current = JSON.parse(cashier.prices)
    },[])

    const {
        millis,
        dateTime,
        formattedDate,
        formattedTime,
        array,
        timestamp,
        numeric   
      } = useTimeZoneDate()

    
     
   
   

    const addSelectedItemToCart = async(item) =>{

        
           console.log('add item to cart', item)
           await addItemToCartByReference(item)
                
    }

    const detachedProductsList = useMemo(() =>{

      const detachedList = JSON.parse(cashier.prices)
      console.log('detachedList', detachedList)
      
      const filtered = detachedList.filter(el => el.detach == "1")
      console.log('detachedList filtered',filtered)

      setDetachedList(filtered)
    },[cashier.prices])




    const total = React.useCallback((arr, field) => arr.reduce((a,e)=>{
        let val = e.deleted?0:e[field]
        return a + val
      },0))

    const sumWeight = React.useCallback((arr) => arr.reduce((a,e)=>{
        let w = e.weight?parseFloat(e.weight.replace(",",".")):0
        let val = e.deleted?0:w
        return a + val
    },0))
    

    
    
   
    

    

  return {
        addSelectedItemToCart,
        detachedList
    }
   
  
}

export default useSelection

