import React, { useState } from 'react'
import FormInput from './assets/FormInput';
import { RegisterUserServerPost } from '../api/user';
import { Auth } from '../assets/functiions/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/AccountModal.css'

// Src: https://youtu.be/tIdNeoHniEY



export default function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Användarnamn",
      errorMessage:
        "Användarnamnet måste innehålla 3-16 karaktärer och får inte innehålla några speciella karaktärer",
      label: "Användarnamn",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Du måste Ange en giltig email",
      label: "Email",
      pattern: '^[A-Za-z0-9]+@[A-Za-z0-9]+[.]{1,1}[A-Za-z0-9]{2,4}$',
      required: true,
    },
 
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Lösenord",
      errorMessage:
        "Lösenorden måste vara 8-20 karaktärer, och måste innehålla minst 1 bokstav, ett nummer och en speciell karaktär (!?# etctera)",
      label: "Lösenord",
      pattern: `^[A-Za-z0-9]{8,16}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Bekräfta Löenord",
      errorMessage: "Lösenorden matchar inte!",
      label: "Bekräfta lösenord",
      pattern: values.password,
      required: true,
    },
      {
      id: 5,
      name: "birthday",
      type: "date",
      placeholder: "Födelsedatum (18+)",
      label: "Födelsedatum (18+)",
      required: true,
    },
  ];


  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  

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
            valid={[input.name]}
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
