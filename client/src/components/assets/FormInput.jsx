import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './css/FormInput.css'

// Input patterns: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_pattern

export default function FormInput(props) {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, type, ...inputProps } = props;
    const [inputType, setType] = useState(type);

    const handleFocus = (e) => {
        setFocused(true);
    };

    const handleBlur = () => {
      setFocused(true);
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
          // onFocus={handleFocus}
          focused={focused.toString()}
          className={`formInpt-input ${focused ? "focused" : ""}`}
        />
        { type === "password" && <TogglePasswordEye /> }
      <span className='errormessage'>{errorMessage}</span>
        </div>
    </div>
  )
}
