/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect } from "react";
import usePersistentContext from "./hooks/usePersistentContext";
import LoginPage from "./components/views/LoginPage";
import Welcome from "./components/views/Welcome";
import useScanner from "./hooks/useScanner";
import Cashier from "./components/views/Cashier";



function App() {
  
  const [did, setDid] = usePersistentContext("did");
  const [ipData, setIpData] = usePersistentContext('ipData')
  const [cashier] = usePersistentContext('cashier')
  const [quantity, setQuantity] = usePersistentContext('quantity')
  const [search, setSearch] = usePersistentContext('search')

  const { initialize } = useScanner()

  useEffect(() => {
    //set device id if not exists
    if (did == undefined){
        setDid(crypto.randomUUID())
    }

    //get ip data
    if (ipData == undefined){
      fetch('https://hutils.loxal.net/whois')
      .then(res=>res.json())
      .then((res)=>{
        //console.log('res:', res)
        setIpData(res)
      }) 
      
      //init quantity
      if(!quantity || !quantity.edit) setQuantity({type:'auto', value:1, edit:false})

      //init search
      if(!search || !search.active) setSearch({active:false, find:'', found:false})
   
  }

  }, [])

  console.log('APP STATE', cashier)

  if(!cashier?.authenticated) return <LoginPage/>

  if(cashier?.authenticated 
    && !cashier?.initialized) return <Welcome />

  return (
    <>
    
    {cashier 
    && cashier.authenticated 
    && cashier.initialized 
    &&
    <>
    <div>
      <button onClick={()=>initialize()}>init scanner</button>
    </div>
    <Cashier />
    </>
    }
   
    
    </>
    
    
    
    
  )
}

export default App
