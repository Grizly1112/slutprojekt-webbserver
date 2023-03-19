import React from 'react'

export default function Register() {
  return (
    <div className='loginModal'>
    <h3>Registera konto</h3>
    <hr />
    <form action="">
      <div>
        <label htmlFor="username">Användarnamn</label>
        <input type="text" name="username" id="" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="" />
      </div>
      <div>
        <label htmlFor="password">Lösenord</label>
        <input type="password" />
      </div>
      <div>
        <label htmlFor="passpasswordConfirmword">Bekräfta lösenord</label>
        <input type="passwordConfirm" />
      </div>
      <input type="submit" value="Registera Konto" />
    </form>
</div>
  )
}
