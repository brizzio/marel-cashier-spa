/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import { useState, useRef} from 'react'
import usePersistentContext from './usePersistentContext'
import useTimeZoneDate from './useTimeZoneDate'

const useScanner = () => {

const [isScannerOn, setIsScannerOn] = useState(false)
const [cashier] = usePersistentContext('cashier')
const [, setReaded] = usePersistentContext('readed') //useState({code:'', count:0})
const counter = useRef(0)
const searchCounter = useRef(0)

const hasSerial = useRef(!!('serial' in navigator))
const port = useRef(null)
const portInfo = useRef(null)
const isReady = useRef(false)

const {
  millis,
  dateTime,
  formattedDate:date,
  formattedTime:time,
  array,
  numeric   
} = useTimeZoneDate()

let initialize = async () => {
    
    if (!hasSerial.current || isScannerOn) return; 

    //clear memory
    console.log('Clearing reading memory');
    setReaded({})

    // The Web Serial API is supported.
    console.log('Awesome, The serial port is supported.');
    console.log('Port is active?',port.current);

    // Get all serial ports the user has previously granted the website access to.
    const ports = await navigator.serial.getPorts();
    console.log(ports);

    if (!port.current){
    console.log('we dont have any port selected, lets get one!!');
    port.current = await navigator.serial.requestPort();
    // Wait for the serial port to open.
    await port.current.open({ baudRate:9600 });
    setIsScannerOn(true)
    }
    
    console.log('Now we have an opened port ... ', port.current.getInfo());

    await connect();
    
  };

  

  const connect = async () => {

    // connect & listen to port messages
    //console.log(port.current.getInfo());
    portInfo.current = port.current.getInfo()
    let scanned = '';
    let end = false
    while (port.current.readable) {
      // Listen to data coming from the serial device.
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.current.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      
      while (true) {
        const scan = await reader.read();
        
        //console.log(scan);
        //console.log(JSON.stringify(scan))

         end = (JSON.stringify(scan).indexOf('r')>-1)
         scanned = scanned + scan.value
         //console.log('end?', end);
         //console.log('scanned on end',scanned, end);
         if(end){
            var nitem = {}
            //console.log('at end>>', scanned, scan)
            var it
            counter.current=counter.current+1
            let code = scanned.replace(/\W/g, "")
            setReaded({
              code:code, 
              count:counter.current,
              origin:'scanner',
              processed:false,
              ...checkEan(code),
              ...searchProductInPriceListFromScannerReading(code)

              })
            

            scanned =''
            end=false
            //scan.done = true
         }
         
         //console.log('list', list.current)
          
        if (scan.done) {
          // Allow the serial port.current to be closed later.
          //console.log('done', scan.done);
          reader.releaseLock();
          break;
        }
        // value is a string will be streaming here.
      }
    }
  };


  const searchProductInPriceListFromScannerReading = (code) =>{
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

  function checkEan(eanCode) {
    let result = {
      read_id:millis,
      read_at:dateTime,
      isEan:true,
      inputCode:eanCode,
      outputCode:'',
      digits:0,
      evaluationType:'',
      error:false,
      errorMsg:''
    }
    eanCode = eanCode.trim();
    if ([8,12,13,14].indexOf(eanCode.length) == -1 ) {
      result.isEan=false
      result.error=true
      result.errorMsg= eanCode.length + 'is an invalid number of digits'
      result.digits = eanCode.length
      result.evaluationType='OTHER'
      return result; 
    }
    //if (eanCode.length < l) {
    //eanCode = Array(14 - eanCode.length).join(0) + eanCode; //add 0's as padding
    
    //if (!eanCode.match(/[\d]{eanCode.length}/))
    //{
    // alert('Illegal characters');
    //return false; }
    var total=0;
    var a=eanCode.split('');
    let isValidEan = isValidBarcode(eanCode)
    
               
    if (!isValidEan) {
      // alert('Wrong checksum');
        result.isEan=false
        result.error=true
        result.errorMsg= total + ' Wrong checksum'
        result.digits = eanCode.length
        result.evaluationType='OTHER'
        return result; 
      }
  
      result.isEan=true;
      result.digits = eanCode.length;
      result.evaluationType='EAN-'+ eanCode.length;
      result.outputCode = Array(14 - eanCode.length).join(0) + eanCode;
      return result; 
    }

    const manualReading = (code)=>{

      searchCounter.current=searchCounter.current + 1
      code.replace(/\W/g, "")
      return {
        code:code, 
        count:searchCounter.current,
        origin:'search',
        ...checkEan(code),
        ...searchProductInPriceListFromScannerReading(code)

        }

    }
  
  

  return (
    {portInfo, initialize, isScannerOn, manualReading}
  )
}

export default useScanner







  

function check8(code){
  code = reverseString(code).split('')
  let sum1 = code[1]*1 + code[3]*1 + code[5]*1+  code[7]*1 //odd
  let sum2 = code[2]*1 + code[4]*1 + code[6]*1//even
   
  return ( 10 - [ (3* sum1 + sum2) % 10 ]) % 10
  
}

function reverseString(str) {
  return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}

var checkSum = (eanString) =>{
  let sum  = eanString.split('').reduce(function(p,v,i) {
  return i % 2 == 0 ? p + 1 * v : p + 3 * v;
  }, 0);

  return sum%10
}

function isValidBarcode(number) {
  const checkDigit = String(number).slice(0, -1).split('').reverse().reduce((sum, v, i) => sum + v * (i % 2 || 3), 0)*9%10
  return /^\d+$/.test(number) && String(checkDigit) === String(number).at(-1)
}

