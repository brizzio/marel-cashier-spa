/* eslint-disable no-unused-vars */
import React from "react"
import usePersistentContext from "./usePersistentContext"

const  useProductsKeyboard = () => {
    const ElementRef = React.useRef()
    const [quantity, setQuantity] = usePersistentContext('quantity')
    
    

    return [ quantity, setQuantity] 
}

export default  useProductsKeyboard