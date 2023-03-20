import React from 'react'
import { FaCircle, FaRegClosedCaptioning } from 'react-icons/fa'
import './css/Login.css'

export default function Login() {
  return (
    <div className='navbarAcountModal loginModal'>
    <h3>Mag Forum Inloggninsportal</h3>
    <hr />
    <form action="">
      <div>
        <label htmlFor="username">Användarnamn eller Email</label>
        <input type="text" name="username" id="" />
      </div>
      <div>
        <label htmlFor="password">Lösenord</label>
        <input type="password" />
      </div>
        <input type="submit" value="Logga in" />
      <a className='forgotPassword'>Glömt lösenord?</a>
      <hr />
      <div className="navbarAcountModalFooter">
        <button>Avbryt</button>
      </div>
    </form>
</div>
  )
}
