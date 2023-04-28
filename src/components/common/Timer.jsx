import React from 'react'

function Timer(props) {

  const option = {
    year: 'numeric',
    month: 'long',     //('long' || 'short' || 'numeric'),
    weekday: 'long',   //  ('long' || 'short'),
    day: 'numeric'
}

const locale = 'it-IT'  //'pt-br'

    const [date, setDate] = React.useState(props.date);

   //console.log('timer prps', new Date(props.date))
   //console.log('timer', new Date(date).toLocaleDateString(undefined, option).//replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))

   //console.log('timerdate', date)
   //console.log('timer time', new Date(date).toLocaleTimeString())

    const style ={
      color: props.textColor,
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
      console.log('timer effect', props.date)
      setDate(props.date)
     }, [props.date]);
   
      function tick() {
       setDate(prev=>new Date(prev).setTime(new Date(prev).getTime() + 1000));
      }

      
      const fulldate = new Date(date).toLocaleDateString( locale, option).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

   
      return (
         <div className={props.cn}>
           {fulldate} {new Date(date).toLocaleTimeString()}
         </div>
       );
}

export default Timer