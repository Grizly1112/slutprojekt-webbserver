import React, { useState } from 'react'
import { FaCircle, FaRegClosedCaptioning } from 'react-icons/fa'
import './css/Login.css'
import FormInput from './FormInput'

export default function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  })

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Användarnamn",
      label: "Username",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Lösenord",
      label: "Lösenord",
      required: true,
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values)
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className='navbarAcountModal RegisterModal'>
      <h3>Logga in</h3>
      <hr />
      <form action="" onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
        />
      ))}
       <hr />
      <div className="Formbuttons">
        <button className='formbutton'>Avbryt</button>
        <button className='formbutton formbuttonRegister' type="submit">Logga in</button>
      </div>
        <a href="" className='forgotPassword'>forgot password?</a>
    </form>
  </div>
  )
}
