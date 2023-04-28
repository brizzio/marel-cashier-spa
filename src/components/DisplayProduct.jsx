import React, { useState, useEffect } from 'react'
import Button from '../customUi/Button'
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/hooks/useAuth';
import useInfo from '../context/hooks/useInfo';

import BouncingDotsLoader from '../utils/BouncingDotsLoader/BouncingDotsLoader';
import { generatePriceFromUpc,
         generateWeightFromUpc,   
         appendLocalStorageCollection } from '../utils/Functions';
import NumericKb from './NumericKb';

import { ui, languages } from '../lexicon'

const statuses = {
    idle:'sospeso',
    automatic:'automatico',
    manual:'manuale'
}

function DisplayProduct(props) {

    const { handleLogout } = useAuth()
    const { insertItem } = useInfo()
    

    const navigate = useNavigate()

    const [prices, setPrices] = useState([])
    const [lid, setLid] = useState("it")
    const [item, setItem ] = useState({}) 
    const [quantity, setQuantity] = useState(1)
    const [upc, setUpc] = useState('')
    const [read, setRead] = useState({})

    const [status, setStatus] = useState(statuses.automatic.toString())

    //console.log('status', status)

    useEffect(() => {
		const list = JSON.parse(localStorage.getItem('priceList'));
		if (list) {
			setPrices(list);
		}
	}, []);

    useEffect(() => {
        //getData(someParam).then(data => setState(data))
        console.log('item setted>>>', item)
      }, [setItem]) 

    const btnTitles = ui.btn

    const handleProductPickerOnClick = ()=>{
        navigate('/products', {state:prices})
    }

    

  const handleQuantityChange = (q) =>{
    setQuantity(q)
  }

  const handleManualView = () =>{

    setStatus(statuses.manual.toString())
  }

  const handleUpcChange = (keyboardInput) => setUpc(keyboardInput)

  const handleOnEnterUpcEvent = async() => {
    console.log('upc entered: ', upc)
    await props.addItem(upc, quantity)
     //clear values
     setUpc('')
     setQuantity(1)
     console.log('end of insert ', upc)


  }



  /* const handleOnEnterUpcEvent = () => {
    console.log('upc entered: ', upc)
    let filtered = prices.filter((p) => p.upc == upc)
    var product = filtered ? filtered[0] : filtered; 
    var item={...product, 
                 quantity:quantity,
                 entryDate:new Date().toISOString(),
                 
    }
    console.log('item>' , item)
    //clear values
    setUpc('')
    setQuantity(1)
    //load item found to list queue
    //setItem(item)
    setStatus(statuses.automatic.toString())
    //update context items variable if item is complete
    if(item.hasOwnProperty('upc')){
        console.log('props.addItem(',item )
        props.addItem(item)
    }
    
  } */

    function increment() {

      //setCount(prevCount => prevCount+=1);
      setQuantity(function (prevCount) {
        console.log('preCount', prevCount)
        return (Number(prevCount) + 1);
      });
    }

    function decrement() {
        setQuantity(function (prevCount) {
            if (prevCount > 1) {
            return (Number(prevCount) - 1); 
            } else {
            return (prevCount = 1);
            }
        });
    }



  

  return (
    
    <div className="flex flex-col h-full w-3/6 mt-3 mr-2">

    <div id="display" className="flex flex-row h-16 min-h-[7.5rem] w-[40rem] mt-0 bg-[#F2F7F5] py-5 ml-2 pr-6 border-2 border-blue-200 rounded-2xl shadow-xl">
        
        
           {status===statuses.automatic && <AutomaticView title={statuses.automatic.toString()}
           component={<BouncingDotsLoader />}/>}
           {status===statuses.manual && <ManualView 
           title={statuses.manual.toString()}
           component={<BouncingDotsLoader />}
           set={handleQuantityChange}
           add={increment}
           subtract={decrement}
           count={quantity}
           code={upc}
           />}
           
        
        
    </div>

    <div className="flex flex-row min-w-full mx-2 mt-3 pr-4 items-center">
        <span className="bg-slate-400 shadow-md text-white text-xs font-semibold text-center py-1 w-[9.5rem] rounded">Data Prezzi: 22/12/2022</span>
        
        <button className="bg-green-400 shadow-md text-white text-xs font-semibold ml-4 text-center w-[19rem] py-1 rounded " onClick={handleManualView}>Inserire il codice del prodotto</button>

        <span className="bg-slate-400 shadow-md text-white text-xs font-semibold ml-3  py-1 rounded  w-[9.5rem] text-center">
            <button onClick={() => 'clickOpenSerial()'}> Open Serial Port </button>
        </span>
    </div>

    {/* ************* COMMANDS ******************************************************** */}

    <div className="flex flex-col h-[18rem] min-w-full pr-1 px-2 ">
            
            <div className="grid grid-flow-col-dense grid-cols-4 grid-rows-5 gap-1 w-[40.5rem] h-full py-2 pr-2">
                
               
                 <Button variant="primary" size="small" className="h-full min-w-full" onClick={()=> navigate("/loyalty")}>{btnTitles.loyalty[lid].toUpperCase()}</Button> 
                
                <Button variant="primary" size="small" className=" min-h-full min-w-full" onClick={()=> navigate("/loyalty")}>{btnTitles.lottery[lid].toUpperCase()}</Button> 
                

                <Button variant="primary" size="normal" className="row-span-3 min-h-full min-w-full" onClick={() => console.log('btn ckick')}>{btnTitles.newCart[lid].toUpperCase()}</Button>
                
                           
                <div className=" rounded col-span-2 row-span-4 mb-2">
                    <NumericKb 
                        view={statuses[status]}
                        onChange={handleQuantityChange}
                        editUpc={handleUpcChange}
                        upcDone ={handleOnEnterUpcEvent}
                    /> 
                </div>
                
                <Button variant="primary" size="small" className="col-span-3 h-full" onClick={() => console.log('btn ckick')}>{btnTitles.cancelCart[lid].toUpperCase()}</Button>

                <Button variant="primary" size="small" className="h-full w-full" onClick={handleProductPickerOnClick}>{btnTitles.productPicker[lid].toUpperCase()}</Button>
                
                <Button variant="primary" size="small" className="h-full min-w-full" onClick={() => console.log('btn ckick')}>{btnTitles.lastCart[lid].toUpperCase()}</Button>

               
                <Button variant="primary" size="small" className="h-full min-w-full" onClick={() => console.log('btn ckick')}>{btnTitles.suspendCashier[lid].toUpperCase()}</Button>
                
                <Button variant="primary" size="small" className="h-full min-w-full" onClick={() => handleLogout()}>{btnTitles.closeCashier[lid].toUpperCase()}</Button>
                    
                
            </div>
        
        </div>




    </div>
  )
}


const Scanned = (props)=>{
    const {product} = props
    return(
    <>
    {/* <div className="flex items-center justify-center ml-2">
            <i class="fa fa-cart-plus fa-lg" aria-hidden="true"></i> 
        </div> */}
        <div className="flex items-center justify-center text-slate-400 text-3xl px-2 border-box border-r-2 border-zinc-200">
            {quantity}
        </div>
        <div className="w-full flex flex-col justify-center pl-3">
            
            <h2>{upc}</h2>
           
            <div className="text-xl font-sans font-semibold	">
                <h3 >
                  {product.name}
                <span> - </span>
                    <span>{product.brand}</span>
                </h3>{/* <!-- name --> */}
            </div>
                           
            <div>
                
                <h6>
                {product.manufacturer}{/* <!-- manufacturer --> */}
                <span> - </span>
                {product.department} {/* <!-- departament --> */}
                </h6> 
                
            </div>

        </div>
        <div className="w-2/6 flex items-center justify-end text-2xl font-sans font-semibold pr-3">
           {product.price} 
        </div>
    
    
    </>
    )};

   /*  {item===undefined?<Scanned product={product}/>:<div className="items-center w-5/6 mt-6 ml-14"><BouncingDotsLoader /></div>} 
    console.log('verif ',status,statuses.manual,status===statuses.manual) */
     
    const AutomaticView = ({title, component}) => {
    return(
        <>
            <div className="absolute w-18 h-6 -mt-4 pl-3 text-xs text-slate-400">
                {title.toLocaleUpperCase()}
            </div>
            <div className="items-center w-5/6 mt-6 ml-14">{component}</div>
        </>
    )};

    const ManualView = ({
        title, 
        component,
        set,        //={handleQuantityChange}
        add,        //={increment}
        subtract,   //={decrement}
        count,      //={quantity}
        code,       //={upc}
    
    }) => {

       //console.log('ManualView code ', code)

    return(
        <>
            <div className="absolute w-18 h-6 mt-20 pl-[35rem] text-xs text-slate-400">
                {title.toLocaleUpperCase()}
            </div>
            
            <div className="flex flex-row w-5/6 h-28  -mt-3  ml-20 ">

               {code===''?
                    <div className="flex flex-col h-full w-full items-center justify-center text-center ">
                    {component}
                    <span className="text-lg ">
                        ENTRA IL CODICE UPC DEL PRODOTTO
                    </span>
                   </div>
                :
                <>
                    
                    <div className="flex flex-col -ml-[4rem] items-center justify-center h-full ">
                    <button onClick={add}>
                        <i className="fa fa-chevron-up text-2xl" aria-hidden="true"></i>
                    </button>
                    <span 
                        className='w-12 min-h-12 border-r-2 border-zinc-400 text-4xl text-center font-semibold' >
                        {count}
                    </span>
                    <button onClick={subtract}>
                        <i className="fa fa-chevron-down text-2xl" aria-hidden="true"></i>
                    </button>
                    </div>
                    <div className="flex h-full w-2/6 items-center ml-4">
                        <span className="text-4xl">
                            {code}
                        </span>
                    </div>
                    
               </>                
                }

              
            </div>


        </>
    )};

export default DisplayProduct