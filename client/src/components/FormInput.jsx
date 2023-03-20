import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './css/FormInput.css'

// källa: för ...props https://legacy.reactjs.org/docs/jsx-in-depth.html#spread-attributes
// Input patterns: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_pattern
export default function FormInput(props) {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, type, ...inputProps } = props;
    const [InputType, setType] = useState(type);

    const handleFocus = (e) => {
        setFocused(true);
    };

    const TogglePasswordEye = () => {
        return(
            <div className="passwordEye" onClick={() => {
              InputType === "password" ? setType("text"): setType("password")
            }}>{InputType === "password" ? <FaEye /> : <FaEyeSlash />}</div>
        )
    }

  return (
    <div className='formInput'>
        <label>{label}</label>
        <div className='formInpt-input'>

        <input
        autoComplete="true"
         {...inputProps}
         type={type === "password" ? InputType: type}
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
      <span className='errormessage'>{errorMessage}</span>
        </div>
    </div>
  )
}
