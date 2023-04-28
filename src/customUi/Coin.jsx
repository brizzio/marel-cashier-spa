import React, { useState, useEffect }from 'react'


function Coin(props) {

  const [count, setCount] = useState(0); // useState returns a pair. 'count' is the current state. 'setCount' is a function we can use to update the state.


  useEffect(() => {

    if(props.reset){
      //console.log(`${props.value}C --- resetting count! --`, count);
      setCount(0)
    }else{

       //console.log(`${props.value}C --- count changed! --`, count);

        props.update(`${props.value}C` , props.value, count)
    }
   
    
  }, [count]);

  useEffect(()=>{
    //console.log(`${props.face} --- props.reset! --`, props.reset)
    if (props.reset) setCount(0)
  },[props.reset]);



    function increment() {
      //setCount(prevCount => prevCount+=1);
      setCount(function (prevCount) {
        return (prevCount += 1);
      });
    }

    function decrement() {
      setCount(function (prevCount) {
        if (prevCount > 0) {
          return (prevCount -= 1); 
        } else {
          return (prevCount = 0);
        }
      });
    }


  return (
    <>
    
    <div className="flex flex-col w-24 justify-center items-center">
  
    
    
    <div className="w-12 h-12 flex justify-center items-center border-2 border-black rounded-full">
      <p className="text-xl font-bold">{props.face}</p>
    </div>
  

  <div className={`flex flex-row items-center justify-between	border border-gray-300 rounded-full w-full  py-1 mt-2`}>
              
            <button className='w-6 items-center ml-2' onClick={decrement}>
            <i className="fa-solid fa-minus"></i>
            </button>

              <div className={`flex flex-row items-center gap-2`}>
                 <span className={`text-2xl font-thin`}>{count}</span>
              </div>
            
             <button className='w-6 items-center mr-2' onClick={increment}>
              <i className="fa-solid fa-plus"></i>
             </button>
              
  </div> 
  
</div>
</>
  )
}

export default Coin