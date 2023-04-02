import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './css/Breadcrumbs.css'
// src: https://www.youtube.com/watch?v=zy8rqihtvA8
export default function Breadcrumbs() {
  const location = useLocation();

  let currentLink = ""

  const crumbs = location.pathname.split('/')
  .filter(crumb => crumb !== '')
  .map(crumb => {
    currentLink =+ `/${crumb}`
    return(
        <div className='crumb' key={crumb}>
            <Link to={currentLink}>{crumb}</Link>
        </div>
    )
    })

    return(
        <div className='breadcrumbs'>
            {crumbs}
        </div>
    )
}

