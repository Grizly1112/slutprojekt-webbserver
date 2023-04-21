import React from 'react'
import './css/Footer.css'
import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

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
      <div className="footer-info">
          <p>@2023 Mag Media</p>
        </div>
    </div>
  )
}
