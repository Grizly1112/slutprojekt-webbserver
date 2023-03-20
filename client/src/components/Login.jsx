import React from 'react'
import { FaCircle, FaRegClosedCaptioning } from 'react-icons/fa'
import './css/Login.css'

export default function Login() {
  return (
    <div className='loginContainer loginModal'>
    <h3>Mag Forum Inloggningsportal</h3>
    <hr />
    <form action="">
      <div>
        <label htmlFor="username" >Användarnamn eller Email</label>
        <input type="text" name="username" id=""placeholder="Användarnamn eller Email" />
      </div>
      <div>
        <label htmlFor="password">Lösenord</label>
        <input type="password" placeholder='Lösenord' />
      </div>
      <div className='loginButtons'>
      <button>Avbryt</button>
        <input type="submit" value="Logga in" />   
      </div>
      <hr />
      <a className='forgotPassword'>Glömt lösenord?</a>

   
  
    </form>
</div>
  )
}
