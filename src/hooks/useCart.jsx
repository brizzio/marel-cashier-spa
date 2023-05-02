/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import usePersistentContext from './usePersistentContext'
import useTimeZoneDate from './useTimeZoneDate'
import useLogger from './useLogger'
import { fetchQuery } from '../api/api'





//https://codesandbox.io/s/react-input-autocomplete-knwn3?file=/src/InputAuto.js


const currentCartModel = {
    active:false,
    cart_id:'',
    date:'',
    created_at:'',
    closed_at:'',
    count:0,
    total:0,
    weight:0,
    fiscal_code:'',
    costumer:{},
    bags:0,
    items:[]
}



const useCart = () => {
    //const [code, setCode] = useState('')
    //            const [found, setFound] = useState({})
    
    const [currentCart, setCurrentCart] = usePersistentContext('currentCart')
    const [cashier, setCashier] = usePersistentContext('cashier')
    const [quantity, setQuantity] = usePersistentContext('quantity')
    const [readed, setReaded] = usePersistentContext('readed')
    const [readings, setReadings] = useLogger('readings')

    const {
        millis,
        dateTime,
        date:formattedDate,
        time:formattedTime,
        array,
        timestamp,
        numeric   
      } = useTimeZoneDate()

    
     
    React.useEffect(()=>{
        if (!currentCart) setCurrentCart(currentCartModel)
    })
     

    function makeItem(i, q){
        return new Promise((resolve)=>{

            let arr = []
            for (let index = 0; index < q; index++) {
            let el = {...i}
            let pos = index + 1
            let o = [pos,q].join("/")
            
            console.log('make item order', o)
            el.entry_id = millis
            el.uid=crypto.randomUUID()
            el.deleted = false
            el.date_added= formattedDate
            el.time_added= formattedTime
            el.index=pos
            el.order = o
            el.quantity= q
            console.log('make item', el)
            arr.push(el)

            }

            resolve(arr)
        })
    }


    const addReadedItem = (item) =>{

        
            let quant = quantity?.value?quantity?.value:1
            console.log('quant', quant)
            
                
                
                makeItem(item, quant)
                .then((res)=>{
                   console.log('res',res)
                   return res.lenght==1
                    ? [...currentCart.items, res[0]]
                    : [...currentCart.items, ...res]
                })
                .then((newList)=>{
                    console.log('newList',newList)
                    const updatedCart = {
                        ...currentCart,
                        items: newList,
                        count: newList.length,
                        total: total(newList, 'calculated_price'),
                        weight: sumWeight(newList)
                    }
                    setCurrentCart(updatedCart)
                })
                

                //console.log('mountItem', item)
                //item.cart_id=cart.id
                //item.device_id=cart.device_id
                //item.store_id=cart.store_id
                
    }




    const total = React.useCallback((arr, field) => arr.reduce((a,e)=>{
        let val = e.deleted?0:e[field]
        return a + val
      },0))

    const sumWeight = React.useCallback((arr) => arr.reduce((a,e)=>{
        let w = e.weight?parseFloat(e.weight.replace(",",".")):0
        let val = e.deleted?0:w
        return a + val
    },0))
    

    //setup a listener for scan reading changes. It will react only if 
    // readed is not already processed
    // quantity is setted to auto (eg. 1)
    // case we have a cart opened and active (currentCart)

    React.useMemo(async ()=>{
        if(readed?.code  && !currentCart?.active){

            console.log('readed changed', readed)
            setReadings(readings
                ?[...readings,{...readed, error:true, errorMsg:"Scanner used while no current cart available"}]
                :[{...readed, error:true, errorMsg:"Scanner used while no current cart available"}])
            
        }
        
        
        if(readed?.code && !readed?.processed && currentCart?.active){

            console.log('readed changed', readed)
            
            await addReadedItem(readed.item)
            setQuantity({type:'auto', value:1, edit:false})
            setReaded({...readed, processed:true, quantity:quantity})
            setReadings(readings
                ?[...readings,{...readed, processed:true} ]
                :[{...readed, processed:true}])
            
        }
        
    },[readed])

    
   
    
      const newCart = () =>{
        console.log('create new cart')
        setCurrentCart({
            cart_id:millis.toString(),
            timestamp,
            active:true,
            date:formattedDate,
            created_at:formattedTime,
            closed_at:'',
            costumer:{},
            items:[],
            bags:0,
            total:0,
            count:0
        })

        //clear last reading
        setReaded({})

      }

      
        
      const addFiscalCode = (code) =>{

            console.log('add fiscal code')
            setCurrentCart({...currentCart, fiscal_code:code})

      }
            

    
    const removeItemByKey = (key) =>{
            
        var item = currentCart.items[key]
        console.log('to delete', item)
    
        const onDeleteList = currentCart.items.map((el,i)=>
            i==key
            ?{...el, deleted:true}
            :el
        )
        const removedState = {
            ...currentCart,
            //list: state.list.filter((item) => item.entry_id !== action.id),
            items:onDeleteList,
            total: total(onDeleteList, 'calculated_price')
        }
    
        setCurrentCart(removedState)
    
     }
            
    
    const deleteCart = () =>{

    console.log('remove currentCart ')
    localStorage.removeItem('currentCart')

    

    }
    
 
    
    const searchCode = (code) =>{
        var data = cashier.prices
        const prices = Array.isArray(data)?data:JSON.parse(data)
        
        //console.log('code prices', prices)
        const match = prices.filter(el => (el.upc == code))
        //console.log('match', match)
        if (match.length == 1) {
            //console.log('match', match[0])
            return match[0]
        }

    }

    
    
    const addItemByCode = async (code) =>{

        console.log('call useCart', code)
        const newList = [...currentCart.items]

        try {

            const item = await searchCode(code)

            let quant = quantity.value?quantity.value:1
            
            for (let index = 0; index < quant; index++) {
                
                console.log('addToCart', item, index)

                item.entry_id = new Date(millis).toISOString().replace(/\D/g, '')
                item.deleted = false
                item.date_added= formatDate(millis)
                item.time_added= new Date(millis).getTime()
                item.order= index +'/' + quant
                item.quantity=1
                //console.log('mountItem', item)
                //item.cart_id=cart.id
                //item.device_id=cart.device_id
                //item.store_id=cart.store_id
                //console.log('cartItem', item)
                newList.push(item)
            }


            const updatedCart = {
                ...currentCart,
                items: newList,
                count: newList.length,
                total: total(newList, 'calculated_price')
            }
    
            setCurrentCart(updatedCart)

            
        
        } catch (error) {
            console.log('addItem Cart error', error)
        }

        
    }

   
// ✅ Format a date to YYYY-MM-DD (or any other format)
    function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }


  const sumArrayByProp = (arr, prop) =>{
    return arr.reduce((a,item)=> a + item[prop],0)
  }

  const updateBagsCount =(value)=>{
    if (currentCart && currentCart.active) setCurrentCart({...currentCart, bags:value})
  }

  const closeCart = async() => {

    console.log('closing cart')

    let c = {...currentCart}
    c.closed_at= millis
    c.count= c.items.length
    c.purchase_items_count= c.items.filter(e=>!e.deleted).length
    c.total=total(c.items,'calculated_price')

    const cartPayload = await postCartPayload(c)

    const requestBody ={
      table:'cashier',
      payload:cartPayload
    }
    await fetchQuery(requestBody).then((res)=>console.log('database sync', res))

    //update cashier session object
    const carts = cashier.carts?cashier.carts:[]

    const updatedCashier = {
        ...cashier,
        carts:[...carts, currentCart]
    }
    setCashier(updatedCashier)

    //clean last current cart object in memory state
    setCurrentCart(currentCartModel)


  }


  async function postCartPayload(c){

    try {

        let sessionInfo = {
            session_id:cashier.session.id,
            session_device_id: cashier.session.device_id,
            session_country_iso:cashier.session.country_iso,
            session_time_zone: cashier.session.time_zone,
            session_timestamp:cashier.session.timestamp,
          }

          let userInfo = {
            user_id:cashier.user.id,
          }

          let companyInfo = {
            company_id:cashier.user.company_id,
            company_name:cashier.user.company_name,
            company_store:1234,
          }
        
          let cartInfo = {
            cart_id:c.cart_id,
            cart_date: c.date,
            cart_created_at:c.created_at,
            cart_closed_at:formattedTime,
            cart_costumer:c.costumer?c.costumer.fiscal_code:'',
            cart_origin:'cashier',
            cart_total:c.total,
            cart_due:c.due?c.due:c.total,
            cart_change:c.change?c.change:0,
            cart_weight:c.weight,
            cart_bags:c.bags,
            cart_items_count:c.items.lenght
          }
        
          let arr =[]
      
          for (let item in c.items){
            
            arr.push({
              ...sessionInfo,
              ...cartInfo,
              ...userInfo,
              ...companyInfo,
              ...c.items[item]
            })
          }
        
          return arr
        
    } catch (error) {
        console.log('an error occurred when mounting cart payload')
    }

    
  
  
  }

  const updatePayment = (money, change) =>{

    const updatedCart = {
        ...currentCart,
        due: money,
        change: change,
    }

    setCurrentCart(updatedCart)

  }

  const setPaymentMode = (mode) =>{

    const updatedCart = {
        ...currentCart,
        payment_mode: mode
    }

    setCurrentCart(updatedCart)

  }

  const resetPaymentMode = () =>{

    const updatedCart = {
        ...currentCart
    }

    delete updatedCart.payment_mode

    setCurrentCart(updatedCart)

  }

  const isPaymentModeOn =currentCart.payment_mode?true:false


    

  return {
        newCart,
        addFiscalCode,
        removeItemByKey,
        searchCode,
        addItemByCode,
        deleteCart,
        formatDate,
        sumArrayByProp, 
        updateBagsCount,
        closeCart,
        setPaymentMode,
        resetPaymentMode,
        updatePayment,
        isPaymentModeOn,
        currentCart
    }
   
  
}

export default useCart

