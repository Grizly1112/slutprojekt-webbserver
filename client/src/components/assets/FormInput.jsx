import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './css/FormInput.css'

// källa: för ...props https://legacy.reactjs.org/docs/jsx-in-depth.html#spread-attributes
// Input patterns: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_pattern
export default function FormInput(props) {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, type, ...inputProps } = props;
    const [inputType, setType] = useState(type);

    const handleFocus = (e) => {
        setFocused(true);
    };

    const handleBlur = () => {
      setFocused(false);
    };

    const TogglePasswordEye = () => {
        return(
            <div className="passwordEye" onClick={() => {
              setTimeout(() => {inputType === "password" ? setType("text"): setType("password")},100);
            }}>{inputType === "password" ? <FaEye /> : <FaEyeSlash />}</div>
        )
    }

  return (
    <div className='formInput'>
        <label>{label}</label>
        <div className='formInpt-input'>

        <input
          autoComplete="true"
          {...inputProps}
          type={type === "password" ? inputType : type}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`formInpt-input ${focused ? "focused" : ""}`}
        />
        {
            type === "password" ? <TogglePasswordEye /> : null
        }
      <span className='errormessage'>{errorMessage}</span>
        </div>
    </div>
  )
}
