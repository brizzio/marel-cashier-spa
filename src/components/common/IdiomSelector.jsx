/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState }from 'react'
import Select from 'react-select'
import { flags } from '../../assets/flags';


var lang = navigator.language || navigator.userLanguage;



//https://blog.logrocket.com/getting-started-react-select/
function IdiomSelector(props) {
    const [selected, setSelected] = useState(null);

    const languages = [

   
        {
            lid:'it',
            country_code:'it',
            country_name:'Italy',
            language_name:'Italian',
            language_code:'it-IT',
            language_code3:'it-ITA',
            language_lcid:'1040',
            flag:flags['it']
        },
        
        {
            lid:'en',
            country_code:'gb',
            country_name:'United Kingdom',
            language_name:'English',
            language_code:'en-GB',
            language_code3:'en-GBR',
            language_lcid:'2057',
            flag:flags['gb']
        },
        
        {
            lid:'pt',
            country_code:'br',
            country_name:'Brazil',
            language_name:'Portuguese',
            language_code:'pt-BR',
            language_code3:'pt-BRA',
            language_lcid:'1046',
            flag:flags['br']
        },
        
        ]

    const options = languages.map(lang =>{
      return { value: lang.lid , label: lang.flag }
    })
  
    const customStyles = {
      
      control: (defaultStyles) => ({
        ...defaultStyles,
        backgroundColor: "transparent",
  
        padding: "2px",
        border: "none",
        boxShadow: "none",
      }),
  
      option: (defaultStyles, state) => ({
        ...defaultStyles,
        color: state.isSelected ? "#212529" : "#fff",
        backgroundColor: state.isSelected ? "#afe1f0" : "#ffffff",
      }),
  
      singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
    };
  
    //console.log(options)
  
    const handleChange = (selectedOption) => {
      setSelected(selectedOption);
      //console.log(`KIOSCO Option selected:`, selectedOption);
    };
  
    return (
      
          
        <div className={props?.cn} >

        <ul className='flex flex-row items-center gap-4 mr-4 text-cyan-900 '>
                    
            <Select className='h-5/6'
                defaultValue = {
                options.filter(option => 
                    option.value === 'it')
            }
                onChange={handleChange} 
                autoFocus={false}
                options={options}
                styles={customStyles}
                formatOptionLabel={opt => (
                <div className="w-fit">
                    <img src={opt.label} alt="country-flag" />
                </div>
                )}
            />  
        </ul>

        </div>
          
          
          
      
    )
}

export default IdiomSelector


