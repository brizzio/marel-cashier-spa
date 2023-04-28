/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import {
    useQuery,
  } from '@tanstack/react-query'
import { fetchQuery } from '../../api/api'
import usePersistentContext from '../../hooks/usePersistentContext'
import useTimeZoneDate from '../../hooks/useTimeZoneDate'

const LoginPage = () => {

    const [signup, setSignup] = useState(false)

    console.log('signup', signup)

  return (

  <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 shadow-lg">
    <div className="max-w-md w-full space-y-8">
        <div>
            <Header
            heading="registratore casssa"
            paragraph="Non riesci ad accedere?"
            pwdMessage="Hai dimenticato la password?"
            linkName="Signup"
            linkUrl="/signup"
            />
           
            {signup?<Signup />:<Login />}

        </div>
    </div>
  </div>
    
  )
}

export default LoginPage


function Header({
    heading,
    paragraph,
    
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-14 w-[8rem]"
                    src="/marel-logo.png"/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            {/* <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
                {linkName}
            </Link> */}
            </p>
        </div>
    )
}


function Login(){

    const fields=loginFields;
    let fieldsState = {};
    fields.forEach(field=>fieldsState[field.id]='');


    const [loginState,setLoginState]=useState(fieldsState);
    const [, setCashier] = usePersistentContext('cashier')
    const [loading, setLoading] = useState(false)
    
    const [did] = usePersistentContext('did')
    const [ipData] = usePersistentContext('ipData')

    const date = useTimeZoneDate()

    //console.log('date', date.getTime().toString())

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=()=>{
        
        console.log('login state', loginState)
        setLoading(true)

        let loginRequest = {
            credentials:loginState,
            device_id: did,
            application: 'cashier',
            date:date.getTime().toString(),
            country_iso:ipData.countryIso,
            ip:ipData.ip,
            time_zone:ipData.timeZone
          }

        console.log('login', loginRequest)

        authenticateUser(loginRequest);
    }

    //Handle Login API Integration here
    const authenticateUser = (payload) =>{
        const requestBody ={
            action:'login',
            payload:payload
          }
          fetchQuery(requestBody).then((res)=>{
            console.log('login responsec', res)
            setCashier(res)
            setLoading(false)
        })
  
    }

    
    return(
        <div className="mt-8 space-y-6">
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login" loading={loading}/>

      </div>
    )
}

function FormAction({
    handleSubmit,
    type='Button',
    loading,
    text
}){
    return(
        <>
        {
            type==='Button' ?
            <button
                
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                onClick={handleSubmit}
            >

                 {loading
                 ?<span className="animate-spin mx-auto">/</span>
                 :text}
            </button>
            :
            <></>
        }
        </>
    )
}

function FormExtra(){
    return(
        <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Sempre On Line!
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
            Hai scordato la password?
          </a>
        </div>
      </div>

    )
}


function Input({
    handleChange,
    value,
    labelText,
    labelFor,
    id,
    name,
    type,
    isRequired=false,
    placeholder,
    customClass
}){

    const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

    return(
        <div className="my-5">
            <label htmlFor={labelFor} className="sr-only">
              {labelText}
            </label>
            <input
              onChange={handleChange}
              value={value}
              id={id}
              name={name}
              type={type}
              required={isRequired}
              className={fixedInputClass+customClass}
              placeholder={placeholder}
            />
          </div>
    )
}

const loginFields=[
    {
        labelText:"Codice utente oppure indirizzo di email",
        labelFor:"uname",
        id:"uname",
        name:"uname",
        type:"text",
        autoComplete:"text",
        isRequired:true,
        placeholder:"Codice utente oppure indirizzo di email"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    }
]

function SignupPage(){
    return(
        <>
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <Signup/>
        </>
    )
}


function Signup(){

    const fields=signupFields;
    let fieldsState = {};
    fields.forEach(field=>fieldsState[field.id]='');
    
    const [signupState,setSignupState]=useState(fieldsState);
  
    const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});
  
    const handleSubmit=(e)=>{
      e.preventDefault();
      console.log(signupState)
      createAccount()
    }
  
    //handle Signup API Integration here
    const createAccount=()=>{
  
    }
  
      return(
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="">
          {
                  fields.map(field=>
                          <Input
                              key={field.id}
                              handleChange={handleChange}
                              value={signupState[field.id]}
                              labelText={field.labelText}
                              labelFor={field.labelFor}
                              id={field.id}
                              name={field.name}
                              type={field.type}
                              isRequired={field.isRequired}
                              placeholder={field.placeholder}
                      />
                  
                  )
              }
            <FormAction handleSubmit={handleSubmit} text="Signup" />
          </div>
  
           
  
        </form>
      )
  }

const signupFields=[
    {
        labelText:"Username",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Username"   
    },
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Confirm Password"   
    }
]