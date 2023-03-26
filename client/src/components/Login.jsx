import React, { useState } from 'react'
import { FaCircle, FaRegClosedCaptioning } from 'react-icons/fa'
import './css/AccountModal.css'
import FormInput from './assets/FormInput'
import { LoginUserServerPost } from '../api/user'
import { Auth } from '../assets/functiions/Auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const [values, setValues] = useState({
    username: "",
    password: "",
  })
  const navigate = useNavigate();
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Användarnamn eller Email",
      label: "Användarnamn eller Email",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const {data} = await LoginUserServerPost(values);
      await Auth(data);

      if(window.location.href.indexOf("login")) {
        navigate("/")
      }
      window.location.reload();

    } catch(err) {
      console.log(err)
      setErrorMsg(err.response.data.message)
    }
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
      {errorMsg ? <p>{errorMsg}</p> : null}
       <hr />
      <div className="Formbuttons">
        <button className='formbutton'>Avbryt</button>
        <button className='formbutton formbuttonRegister' type="submit">Logga in</button>
      </div>
        <a href="" className='forgotPassword'>Glömt lösenord?</a>
    </form>
  </div>
  )
}
