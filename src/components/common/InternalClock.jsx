import React from 'react'
import usePersistentContext from '../usePersistentContext';

function InternalClock({tzDate, show, cn, textColor}) {

  const option = {
    year: 'numeric',
    month: 'long',     //('long' || 'short' || 'numeric'),
    weekday: 'long',   //  ('long' || 'short'),
    day: 'numeric'
}

const locale = 'it-IT'  //'pt-br'

    const [date, setDate] = React.useState();

   //console.log('timer prps', new Date(props.date))
   //console.log('timer', new Date(date).toLocaleDateString(undefined, option).//replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))

   //console.log('timerdate', date)
   //console.log('timer time', new Date(date).toLocaleTimeString())

    const style ={
      color: textColor,
      fontSize:'12px',
      marginTop:'3px'
    }
  
    //Replaces componentDidMount and componentWillUnmount
    React.useEffect(() => {
     var timerID = setInterval( () => tick(), 1000 );
     return function cleanup() {
         clearInterval(timerID);
       };
    });

    React.useEffect(() => {
      console.log('timer effect', tzDate)
      setDate(tzDate.getTime())
     }, [tzDate]);
   
      function tick() {
       let dt = new Date(date).setTime(new Date(date).getTime() + 1000);
       setDate(new Date(dt).getTime());
      }

      
      const fulldate = new Date(date).toLocaleDateString( locale, option).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

   
      return (

        show && 
        <div className={cn}>
          {fulldate} {new Date(date).toLocaleTimeString()}
        </div>
        
         
       );
}

export default InternalClock