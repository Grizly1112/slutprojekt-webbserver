import React, { useState } from 'react'
import FormInput from './FormInput';
import { RegisterUserServerPost } from '../api/user';
import { Auth } from '../assets/functiions/Auth';
import { useNavigate } from 'react-router-dom';
// Src: https://youtu.be/tIdNeoHniEY

export default function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
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
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
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
       // {
    //   id: 5,
    //   name: "birthday",
    //   type: "date",
    //   placeholder: "Födelsedatum",
    //   label: "Födelsedatum",
    //   required: true,
    // },
  ];

  const handleSubmit = async (e) => {
    const navigate = useNavigate();

    e.preventDefault();
    try{
      const {data} = await RegisterUserServerPost(values);
      Auth(data);

      if(window.location.href.indexOf("register")) {
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
        <button className='formbutton formbuttonRegister' type="submit">Registera konto</button>
      </div>
    </form>
</div>
  )
}

/*
}

*/