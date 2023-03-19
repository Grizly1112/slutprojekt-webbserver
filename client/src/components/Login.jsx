import React from 'react'
import { FaRegClosedCaptioning } from 'react-icons/fa'

export default function Login() {
  return (
    <div className='loginModal'>
    <h3>Logga in</h3>
    <hr />
    <form action="">
      <div>
        <label htmlFor="username">Användarnamn</label>
        <input type="text" name="username" id="" />
      </div>
      <div>
        <label htmlFor="password">Lösenord</label>
        <input type="password" />
      </div>
      <input type="submit" value="Logga in" />
    </form>
</div>
  )
}
