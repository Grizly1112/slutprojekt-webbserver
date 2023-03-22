import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

export default function ServerError() {
  return (
    <div className='serverError'>
        <FaExclamationTriangle className='icon' />
        <h4>Serverfel uppstod</h4>
        <p>Vänligen kontakta och rapportera fel till utvecklare</p>
        <NavLink className='goBack' to="/">Gå till Startsida</NavLink>
    </div>
  )
}
