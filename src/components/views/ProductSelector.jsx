/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import useSelection from '../../hooks/useSelection'

const ProductSelector = ({close}) => {

const [product, setProduct] = React.useState({})
const [list, setList] = React.useState([])

const {
    addSelectedItemToCart,
    detachedProductsList
} = useSelection()


React.useEffect(()=>{
    setList(detachedProductsList())
},[])

 const handleClose = () =>{

    console.log('closing selector')
    close()

 }

 


  return (
    <div>
        <div>
            {
                list.map((e,i)=>{
                    return (
                    <div key={i}>
                        <p>
                            {e.upc}
                        </p>
                    </div>
                    )
                })
            }
        </div>
        <button onClick={handleClose}>cancel</button>
    </div>
    
  )
}

export default ProductSelector


const Products = () =>{

    
}