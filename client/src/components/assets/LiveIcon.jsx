import React from 'react'
import './css/LiveIcon.css'

export default function LiveIcon({live, color, width, height}) {
    const style = {
      '--liveIconBg': color || 'var(--bg-m)',
      width: width || '18px',
      height: height || '18px',
    };
  
    return (
      <div className={live ? "liveIcon live": "liveIcon"} style={style}></div>
    )
  }