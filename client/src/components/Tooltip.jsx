import React, { useEffect } from 'react'
import './css/Tooltip.css'
import './css/Navbar.css'

export default function Tooltip(props) {
    return(
        <div className='tooltip'>
        {
            props.label ? <span className="tooltiptext">{props.label}</span> : null
        }
         {props.children}
    </div>
        )
}
