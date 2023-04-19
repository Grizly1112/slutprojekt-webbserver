import React, { useState } from 'react'
import FormInput from './assets/FormInput';
import { RegisterUserServerPost } from '../api/user';
import { Auth } from '../assets/functiions/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/AccountModal.css'

// Src: https://youtu.be/tIdNeoHniEY

export default function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
  });

  const [valid, setValid] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    birthday: false
  })

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try{
      const {data} = await RegisterUserServerPost(values);
      await Auth(data);

      if(window.location.href.indexOf("register")) {
        navigate("/")
       }
      
   window.location.reload();

    } catch(err) {
      console.log(err)
      setErrorMsg(err.response.data.message)
    }

  };

  const onChange = async (e) => {
    let value = e.target.value;
    let pattern = e.target.pattern;
  
    let valueMatch = value.match(pattern)? true: false
    setValid({...valid, [e.target.name]: valueMatch})
    setValues({ ...values, [e.target.name]: e.target.value});
  };

  return (
    <div className='navbarAcountModal loginModal'>
    <h3>Registera konto</h3>
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
        {errorMsg ? <p>{errorMsg}</p> : null}
      <hr />
      <div className="Formbuttons">
        <button className='formbutton'>Avbryt</button>
        <button className='formbutton formbuttonRegister' type="submit" 
        disabled={(valid.username && valid.email && valid.password && valid.confirmPassword) ? false: true}
        >Registera konto</button>
      </div>
    </form>
</div>
  )
}
