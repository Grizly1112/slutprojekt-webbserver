import React, { useContext, useEffect, useState } from 'react'
import './css/Members.css'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { FaGlobe, FaSearch, FaUser, FaUserFriends, FaUserPlus, FaUserSecret, FaUserShield, FaUsers } from 'react-icons/fa'
import { userContext } from '../../context/UserContext'
import MembersSideBar from './components/MembersSideBar'


export default function Members() {


  return (
    <>
    <div className='members'>
      <MembersSideBar />
      <div className="memebers-container">
          <Outlet />
      </div>
    </div>
    </>
  )
}
