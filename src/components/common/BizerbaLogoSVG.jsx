/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { ReactSVG } from 'react-svg'

const BizerbaLogoSVG = (props) => {

  
  return (
    <ReactSVG
        afterInjection={(svg) => {
            'console.log(svg)'
        }}
        beforeInjection={(svg) => {
            svg.classList.add('svg-class-name')
            svg.setAttribute('style', 'width: 80px')
    
        }}
        className={props.cn}
        evalScripts="always"
        fallback={() => <span>Error!</span>}
        httpRequestWithCredentials={true}
        loading={() => <span>Loading</span>}
        onClick={() => {
            console.log('wrapper onClick')
        }}
        onError={(error) => {
            console.error(error)
        }}
        renumerateIRIElements={false}
        src='bizerba-logo.svg'
        useRequestCache={false}
        wrapper="div"
        />
  )
}

export default BizerbaLogoSVG