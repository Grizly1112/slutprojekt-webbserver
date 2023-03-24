import React, { useEffect, useState } from 'react'
import './css/Loader.css'


export function Loader (props) {
    // en sleep funktionm, om inladningen är mindre eller lika med 100ms så är det inte lönt att ladda loadern

  return (
        // <div class="loader_wrap">
        //         <h4>{props.label}...</h4>    
        //         {/* <div class="loader">Loading...</div> */}
    
        // </div>
            <div class="spinner">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
            <div class="bar4"></div>
            <div class="bar5"></div>
            <div class="bar6"></div>
            <div class="bar7"></div>
            <div class="bar8"></div>
            <div class="bar9"></div>
            <div class="bar10"></div>
            <div class="bar11"></div>
            <div class="bar12"></div>
        </div>
            
    )
}

export function Spinner() {
    return(
        <div class="spinner">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
            <div class="bar4"></div>
            <div class="bar5"></div>
            <div class="bar6"></div>
            <div class="bar7"></div>
            <div class="bar8"></div>
            <div class="bar9"></div>
            <div class="bar10"></div>
            <div class="bar11"></div>
            <div class="bar12"></div>
        </div>
    )
}

