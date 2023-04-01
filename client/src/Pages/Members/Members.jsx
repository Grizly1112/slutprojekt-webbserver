import React from 'react'
import './css/Members.css'
import { NavLink, Outlet } from 'react-router-dom'
import { FaGlobe, FaSearch, FaUser, FaUserFriends, FaUserPlus, FaUserSecret, FaUserShield, FaUsers } from 'react-icons/fa'


export default function Members() {
  return (
    <>
    <div className='members'>
      <div className="members-header">
            <div className="members-logo">
              <FaUsers />
              <h4>Medlemmar</h4>
            </div>
        <div className="inner-header">
          <ul>
            <NavLink to='/members'><FaGlobe />Utforska</NavLink>
            <NavLink to='/members/user'><FaUser /> Ditt konto</NavLink>
            <NavLink to='/members/firends'><FaUserFriends /> Vänner</NavLink>
            <NavLink to='/members/friendrequest'><FaUserPlus /> Vänförfrågningar</NavLink>
          </ul>
        </div>
        <hr />
      </div>
    <Outlet />
    </div>
    </>
  )
}
