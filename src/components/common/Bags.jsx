/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect}from 'react'
import useCart from '../../hooks/useCart'




const Bags = ({initialValue = 0}) => {

   
    
    const [count, setCount] = useState(initialValue)
    const {currentCart, updateBagsCount } = useCart()
    
 console.log('bacurrentCart', currentCart)
    
    useEffect(()=>{
      if(currentCart?.active) updateBagsCount(count)
    },[count])

    

    function increment() {
        //setCount(prevCount => prevCount+=1);
        if(currentCart.active) {
          setCount(function (prevCount) {
          return (prevCount += 1);
        });
      }
        
      }
  
    function decrement() {

        if(currentCart.active){

          setCount(function (prevCount) {
            if (prevCount > 0) {
              return (prevCount -= 1); 
            } else {
              return 0;
            }
          });


        }        
    }

      function processBagUpdate (){
        // Get the Array item which matchs the id "2"
        
        

      }

  return (
    <div className='flex flex-col items-center text-xl   h-fit py-1 px-1  '>
         <button onClick={increment}>
            <i className="fa-solid fa-chevron-up fa-3x text-teal-700"></i>
        </button>
      <div className={`flex w-[6rem] items-center`}>
        <i className="fa-solid fa-bag-shopping fa-3x text-zinc-500"></i>
        <span className={`text-5xl font-thin pl-3 text-teal-700`}>{count}</span>
      </div>
        


        <button onClick={decrement}>
            <i className="fa-solid fa-chevron-down fa-3x text-teal-700"></i>
        </button>
    </div>
  )
}

export default Bags