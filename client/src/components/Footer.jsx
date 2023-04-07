import React from 'react'
import './css/Footer.css'
import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

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

      </div>
    </div>
  )
}
