import React from 'react'
import './css/Footer.css'
import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import {
  FaRegSun,
  FaRegMoon,
} from 'react-icons/fa';
import logo from '../assets/logo.png';


export default function Footer() {
    const Breadcrumbs = () => {
        const location = useLocation();
      
        let currentLink = ""
      
        const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
          currentLink =+ `${crumb}`
          return(
              <div className='crumb' key={crumb}>
                  <FaChevronRight />
                  <Link to={currentLink}> {crumb }  </Link>
              </div>
          )
          })
      
          return(
              <div className='breadcrumbs'>
                  {
                      crumbs.length > 0 ? 
                      <>
                        <div className='crumb'>
                        <Link className='footer-home' to={"/"}> Mag Forum </Link>
                    </div>
                      {crumbs}
                      <hr />
                      </>
                      : null
                  }
              </div>
          )
      }


    

  return (
    <div className='footer'>
      <div className="footer-content">
        <Breadcrumbs />
        <hr />
        <div className="footer-box">
          <div className="footer-links">
            <h3>Användare</h3>
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
            <h3>Info</h3>
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
            <h3>Contact</h3>
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
      <hr />
      <div className="footer-info">
        <div className="footer-logo">
          <img className="logo" src={logo} alt="" />
          <p>@2023 Mag Media</p>
        </div>
        <div className="footer-themes">
          <div className="footer-switch">
            <div className="footer-theme" id='light'>Light</div>
            <div className="footer-space"></div>
            <div className="footer-theme" id='dark'>Dark</div>
          </div>
        </div>
            
      </div>
    </div>
  )
}
