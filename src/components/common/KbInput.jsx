/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React from "react";

const KbInput = (props, ref) => {
    const { id, classes } = props;
    const [val, setVal] = React.useState('')
    
    console.log('input ref', ref)

    const handleChange = (e)=> {console.log('input value', e.target.value)
            setVal(e.target.value)
        }
        

    return (
      
        <input className={classes} id={id} onChange={handleChange} value={val} ref={ref} autoFocus/>
      
    );
  };
  
  export default React.forwardRef(KbInput);             2