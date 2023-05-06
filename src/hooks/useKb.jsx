import React from 'react'
import KbInput from '../components/common/KbInput'

const useKb = () => {
  
    const refElement = React.useRef(null)

    const [value, setValue] =React.useState('')

    const change = (v)=> setValue(v)

    const handleChange = (e)=> console.log('input value', e.target.value)

    

    

    const Input = <KbInput
        ref={refElement}
        type="text"
        onChange={handleChange}
        value={value}
    />

  return [Input, change]
  
}

export default useKb

