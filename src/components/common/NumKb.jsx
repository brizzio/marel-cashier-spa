/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import useKb from '../../hooks/useKb'

const NumKb = () => {

    const [value, setValue]=React.useState('')
    const [enter, setEnter]=React.useState(false)
    const [ref, setRefValue] = useKb()
    
    const handleNumberClick = (face)=>{
        const v = value.toString() + face.toString()
        setValue(v)
            
    }


    const clear = () => {
        setValue('')
        setEnter(false)
    }

    const handleDelete = () => {
        let v = value.slice(0, -1);
        //console.log('cleared', v)
        setValue(v)
    }

    const handleEnter = () => {
        setEnter(true)
    }

    

    React.useMemo(()=>{
        console.log('kb change', value)
        setRefValue(value)
    },[value])

    //console.log('numeric keyboard', value)
    const enable = ( value !== '')
    //console.log('enable', enable)

//border border-sky-600 rounded-md
  return (
    <div className="container grid grid-cols-3 grid-rows-4 gap-3  h-[23.5rem] w-full mt-2">
        <Button face={1} action={handleNumberClick}/>
        <Button face={2} action={handleNumberClick}/>
        <Button face={3} action={handleNumberClick}/>
        <Button face={4} action={handleNumberClick}/>
        <Button face={5} action={handleNumberClick}/>
        <Button face={6} action={handleNumberClick}/>
        <Button face={7} action={handleNumberClick}/>
        <Button face={8} action={handleNumberClick}/>
        <Button face={9} action={handleNumberClick}/>
        <ButtonDelete action={handleDelete} isEnabled={enable}/>
        <Button face={0} action={handleNumberClick}/>
        <ButtonEnter action={handleEnter} isEnabled={enable}/>
        
    </div>
  )
}

export default NumKb

const Button = ({
    face,
    action,
    
}) =>{


    const click = () =>{
        //console.log('clicked', face)
    }
    
    return (
        <button className=" flex items-center justify-center border  rounded-md  border-zinc-300 text-5xl text-teal-700 font-semibold shadow-md"
        onClick={()=>action(face)}>{face}</button>
    )

}

const ButtonDelete = ({
    action,
    isEnabled
}) =>{

    //React.useEffect(()=>setEnabled(isEnabled),[isEnabled])

    //console.log('del enabled', isEnabled)
    //const [enabled, setEnabled] = React.useState(true)
    
    const click = () =>{
        //console.log('clicked delete')
    }



    return (
        <button className=" flex items-center justify-center border  rounded-md  border-zinc-300 text-3xl font-semibold shadow-md
        disabled:text-zinc-400"
        disabled={!isEnabled}
        onClick={action}>DEL</button>
    )

}

const ButtonEnter = ({
    action,
    isEnabled
}) =>{

   
    const click = () =>{
        //console.log('clicked enter')
    }



    return (
        <button className=" flex items-center justify-center border  rounded-md  border-zinc-300 text-3xl font-semibold shadow-md
        disabled:text-zinc-400"
        disabled={!isEnabled}
        onClick={action}>
            <i className="fa-solid fa-lg fa-arrow-right-to-bracket"></i>
        </button>
    )

}