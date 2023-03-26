import React from 'react'
import { FaChartBar, FaChartLine, FaChartPie, FaCircleNotch, FaCriticalRole, FaHammer, FaJsSquare, FaMailBulk, FaRedhat, FaSearch, FaUsers } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import './css/Home.css'
import userDefault from '../assets/avatarDefault.png'
import Tooltip from '../components/assets/Tooltip'

export default function Home() {
  const SideWidget = (props) => {
    return(
      <div className='sideWidget'>
        <div className="header">
          {props.icon}
          <h2>{props.title}</h2>
          {
            props.live ? 
              <div className="circle"></div>
            : null
          }
        </div>
          <hr />
        <div className='Widget-body'>
          {
            props.children
          }
        </div>

      </div>
    )
  }

  return (
    <div className='home'>
      <div className="left"></div>
      <div className="center"></div>
      <div className="right">
        <SideWidget icon={<FaUsers />} title="Användare online" live={true}>
          <>
            <div className='usersOnline'>
              <Tooltip label="grizly">
                <img src={userDefault} className="onlineUsers-img" alt="" />
              </Tooltip>
              <Tooltip label="Deffla">
                <img src={userDefault} className="onlineUsers-img" alt="" />
              </Tooltip>
              <Tooltip label="Gmail">
                <img src={userDefault} className="onlineUsers-img" alt="" />
              </Tooltip>
              <Tooltip label="Bemil">
                <img src={userDefault} className="onlineUsers-img" alt="" />
              </Tooltip>
              <Tooltip label="Bemil">
                <img src={userDefault} className="onlineUsers-img" alt="" />
              </Tooltip>
              <h4>+4 andra</h4>
            </div>
            <h5 className='displayAll'>Totalt 7 stycken (Medlemmar: 4, Gäster: 3)</h5>
            <NavLink to="#" className="viewmore"><FaSearch /> Visa alla användare online</NavLink>
          </>
        </SideWidget>
        <SideWidget icon={<FaMailBulk />} title="Aktiva trådar" />
        <SideWidget icon={<FaChartBar />} title="Forum statistik" />
      </div>
    </div>
  )
}
