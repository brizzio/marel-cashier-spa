/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import usePersistentContext from '../../hooks/usePersistentContext'



const NumericKeyboard = () => {

    const [value, setValue]=React.useState('')
    const [quantity, setQuantity] = usePersistentContext('quantity')
    const [search, setSearch] = usePersistentContext('search')
    const [readed, setReaded] = usePersistentContext('readed')
    const [cashier] = usePersistentContext('cashier')
  

    const handleNumberClick = (face)=>{
        const v = value.toString() + face.toString()
        setValue(v)
            
    }

    const focus = quantity?.type == 'manual' && quantity?.edit
    ?'quantity'
    :search?.active
    ?'search'
    :'none'

    const keyboard = search?.active

    const clear = () => setValue('')

    const handleDelete = () => {
        let v = value.slice(0, -1);
        //console.log('cleared', v)
        setValue(v)
    }

    const handleEnter = () => {
        if(focus == 'quantity') setQuantity({...quantity, edit:false})
        if(focus == 'search') doSearch(value)
        clear()
    }

    const doSearch = (val) => {
        console.log('perform search on ', val)

        const searchProductInPriceList = (code) =>{
            var data = cashier.prices
            const prices = Array.isArray(data)?data:JSON.parse(data)
            //console.log('code prices', prices)
            const match = prices.filter(el => (el.upc == code))
            //console.log('match', match)
            if (match.length == 1) {
                //console.log('match', match[0])
                return {found:true, item:match[0]}
            }else{
              return {found:false, item:{}}
            }
          
          }

        let result = searchProductInPriceList(val)

        if(result?.found){
            setSearch({...search, active:false, item:result?.item, found:result?.found})
            
        }else{

            console.log('search null', {...search, active:true, item:result?.item, found:result?.found})
            setSearch({...search, active:true, item:result?.item, found:result?.found})
        }
       
    }


    React.useMemo(()=>{
        if(focus == 'quantity') setQuantity({...quantity, value:Number(value)})

        if(focus == 'none') setValue('')  

        if(focus == 'search') setSearch({...search, find:value})
        
    },[value])

    //console.log('numeric keyboard', value)
    const enable = ( value !== '')
    //console.log('enable', enable)

//border border-sky-600 rounded-md
  return (
    <div className="container grid grid-cols-3 grid-rows-4 gap-1  h-[24rem] w-[24rem] p-2">
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

export default NumericKeyboard

const Button = ({
    face,
    action,
    
}) =>{


    const click = () =>{
        //console.log('clicked', face)
    }
    
    return (
        <button className=" flex items-center justify-center border  rounded-md  border-zinc-300 text-3xl font-semibold shadow-md"
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
        disabled:text-zinc-200"
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
        disabled:text-zinc-200"
        disabled={!isEnabled}
        onClick={action}>
            <i className="fa-solid fa-lg fa-arrow-right-to-bracket"></i>
        </button>
    )

}