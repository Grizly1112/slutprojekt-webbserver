import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa';
import './css/FormInput.css'

// källa: för ...props https://legacy.reactjs.org/docs/jsx-in-depth.html#spread-attributes
// Input patterns: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_pattern
export default function FormInput(props) {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, type, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    const TogglePasswordEye = () => {
        return(
            <div className="passwordEye"><FaEye /></div>
        )
    }

  return (
    <div className='formInput'>
        <label>{label}</label>
        <div className='formInpt-input'>

        <input
         {...inputProps}
         type={type}
         onChange={onChange}
         onBlur={handleFocus}
         onFocus={() =>
            inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
        ></input>
        {
            type === "password" ? <TogglePasswordEye /> : null
        }
        </div>
      <span>{errorMessage}</span>
    </div>
  )
}
