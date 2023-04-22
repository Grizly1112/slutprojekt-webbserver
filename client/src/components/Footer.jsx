import React, { useEffect, useState } from 'react'
import './css/Footer.css'
import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight, FaMoon, FaSun } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import {
  FaRegSun,
  FaRegMoon,
} from 'react-icons/fa';
import logo from '../assets/logo.png';


export default function Footer() {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      setTheme(false);
    } else {
      setTheme(JSON.parse(localStorage.getItem('theme')).theme);
    }

  },[])


    const Breadcrumbs = () => {
        const location = useLocation();
      
        let currentLink = ""
      
        const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
          currentLink =+ `${crumb}`
          return(
              <div className='crumb' key={crumb}>
                  <Link to={currentLink}> {crumb }  </Link>
                  <FaChevronRight />
              </div>
          )
          })
      
          return(
              <div className='breadcrumbs'>
                  {
                      <>
                        <div className='crumb'>
                        <Link className='footer-home' to={"/"}> Mag Forum </Link>
                        <FaChevronRight />
                    </div>
                      {crumbs}
                      </>
                  }
              </div>
          )
    }


    const changeTheme = () => {
      let newTheme = false;

      if(theme === true) {
        newTheme = false;
      } else {
        newTheme = true;
      }
      document.documentElement.setAttribute('data-dark-mode', newTheme);
      localStorage.setItem("theme", JSON.stringify({theme: newTheme}))
      setTheme(newTheme)
    }

    

  return (
    <div className='footer'>
      <div className="footer-content">
        <Breadcrumbs />
        <hr />
        <div className="footer-box">
          <div className="footer-links">
            <h3>Mag Media</h3>
            <NavLink className='footer-navlink' to={`/terms`}>
              Terms of Service
            </NavLink>
            <NavLink className='footer-navlink' to={`/terms`}>
              Terms of Service
            </NavLink>
            <NavLink className='footer-navlink' to={`/terms`}>
              Terms of Service
            </NavLink>
          </div>
          <div className="footer-links">
            <h3>Länkar</h3>
            <NavLink className='footer-navlink' to={`/terms`}>
              Terms of Service
            </NavLink>
            <NavLink className='footer-navlink' to={`/terms`}>
              Terms of Service
            </NavLink>
            <NavLink className='footer-navlink' to={`/terms`}>
              Terms of Service
            </NavLink>
          </div>
          <div className="footer-links">
            <h3>Övrigt</h3>
            <NavLink className='footer-navlink' to={`/terms`}>
              Terms of Service
            </NavLink>
            <NavLink className='footer-navlink' to={`/terms`}>
              Terms of Service
            </NavLink>
            <NavLink className='footer-navlink' to={`/terms`}>
              Terms of Service
            </NavLink>
          </div>
        </div>
        
      </div>
      <div className="footer-info">
        <NavLink to={"/"} className="footer-logo">
          <img className="logo" src={logo} alt="" />
        </NavLink>
        <div className="footer-themes">
          <div className="footer-switch">
            <div className={theme ? "footer-theme" :"footer-theme activeFooterLink"} id='dark' onClick={changeTheme}><FaSun/> Ljust</div>
            <div className="footer-space"></div>
            <div className={theme ? "footer-theme activeFooterLink": "footer-theme"} id='light' onClick={changeTheme}><FaMoon />Mörkt</div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <hr/>
        <p>Copyright © 2023 Mag Media. All rights reserved.</p>
      </div>
    </div>
  )
}
