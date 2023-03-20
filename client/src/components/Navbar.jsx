import './css/Navbar.css'
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FaBell, FaBolt, FaChevronCircleLeft, FaMailBulk, FaPlus, FaCog, FaChevronRight, FaChevronLeft, FaUserAlt, FaFacebookMessenger, FaMedal, FaStumbleupon, FaDotCircle, FaDemocrat, FaRegCommentAlt, FaRegCommentDots, FaRegUser, FaUserPlus, FaUser, FaUserCircle, FaChevronCircleRight, FaFileArchive, FaQuestion, FaRegQuestionCircle, FaMoon, FaRuler, FaRegNewspaper, FaSun, FaSuitcaseRolling, FaBaby, FaExpandAlt, FaChevronDown, FaClipboard, FaExternalLinkAlt, FaExclamationTriangle, FaFireExtinguisher, FaQuoteLeft, FaFastForward, FaEnvelopeOpenText, FaExternalLinkSquareAlt, FaRegBell, FaConciergeBell, FaToggleOff, FaPowerOff, FaBellSlash, FaRunning, FaHandMiddleFinger, FaInfinity, FaLevelDownAlt, FaHandshake, FaHandshakeSlash } from 'react-icons/fa';
import Modal from './Modal';
import Utils from '../assets/functiions/Utils'
import Tooltip from './Tooltip';
import Login from './Login';
import Register from './Register';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';

// Källkod: https://www.youtube.com/watch?v=IF6k0uZuypA&t=382s
// Inspiration Gymansiearbete Valeria forum

function Navbar() {
  const [notificationCount, SetNotificationCount] = useState(1);
  const resetNotifications = () => SetNotificationCount(0);
  const [user, setUser] = useState(true);

  function NavbarEndLoggedIn() {
    function NavItem(props) {
      return (
        <li className="nav-item">
          {props.notifications ? <span className='navbar-notification-count'>{Utils.FormatNotificationCount(notificationCount)}</span> : null}
          {props.children}
        </li>
      );
    }

    function UserModal() {
      const [theme, setTheme] = useState(true);
      const [status, setStatus] = useState(true);
      const [notifactions, setNotifiactions] = useState(true);

      const settingsmenuToggler = () => {
        setTimeout(() => {setSettingsmenuOpen(!settingsmenuopen)}, 200)
      }
   
      const NavbarModalitem = (props) => {
        return(
        <div className='navbarModal-item title'>
          <div className="navbarModal-item-icon-left">{props.iconleft}</div>
          <h4 className='navbarModal-label'>{props.label}</h4>
            <div className="navbarModal-item-icon-right">{props.iconRight}</div>
        </div>
        )
      }

      return(
        <>
          <div className='navbarModal'>
            <NavbarModalitem iconleft={<FaUserCircle />} label={"Ditt konto"} iconRight={<FaChevronCircleRight />}/>
            <hr/>
            <NavbarModalitem iconleft={ status ? <FaHandshake /> : <FaHandshakeSlash />} label={status ? "Online": "Offline"}iconRight={
              <>
              <label className="switch">
                <input type="checkbox"defaultChecked={status} onChange={()=> setTimeout(() => {setStatus(!status)}, 200) }/>
                <span className="slider round"></span>
              </label>
              </>
            }/>
              <NavbarModalitem iconleft={ notifactions ? <FaRegBell /> : <FaBellSlash />} label={"Aviseringar"}iconRight={
              <>
              <label className="switch">
                <input type="checkbox"defaultChecked={notifactions} onChange={()=> setTimeout(() => {setNotifiactions(!notifactions)}, 200) }/>
                <span className="slider round"></span>
              </label>
              </>
            }/>
            
             <NavbarModalitem iconleft={ theme ? <FaMoon /> : <FaSun />} label={theme ? "Mörkt": "Ljust"}iconRight={
              <>
              <label className="switch">
                <input type="checkbox"defaultChecked={theme} onChange={()=> setTimeout(() => {setTheme(!theme)}, 200) }/>
                <span className="slider round"></span>
              </label>
              </>
            }/>
            <hr />
            <NavbarModalitem iconleft={<FaCog />} label={"Inställningar"} iconRight={<FaExternalLinkAlt />} />
            <NavbarModalitem iconleft={<FaRegNewspaper />} label={"Användarvilkor"} iconRight={<FaExternalLinkAlt />}/>
            <NavbarModalitem iconleft={<FaRegQuestionCircle />} label={"Hjälp"} iconRight={<FaExternalLinkAlt />}/>
            <hr />
            <NavbarModalitem iconleft={<FaRunning />} label={"Logga ut"} iconRight={<FaChevronCircleRight />}/>
          </div>
        </>
      )
    }

    return (
      <>
        <NavItem>
          <Modal btnLabel={<FaPlus />} btnClass="icon-button" tooltip="Skapa">
            <div className='navbarModal'>Chat</div>
          </Modal>
        </NavItem>

        <NavItem>
          <Modal btnLabel={<FaRegCommentDots />} btnClass="icon-button" tooltip="Direktmeddelanden">
            <div className='navbarModal'>Chat</div>
          </Modal>
        </NavItem>

        <NavItem notifications={(notificationCount > 0) ? notificationCount : null}>
          <Modal btnLabel={<FaBell className={(notificationCount > 0) ? 'notificationbell': null} />} btnClass="icon-button" tooltip="Aviseringar" func={resetNotifications}>
            <div className='navbarModal'>
            </div>
          </Modal>
        </NavItem>

        <NavItem>
          <Modal btnLabel={<FaUserAlt />} btnClass="icon-button">
            <UserModal />
          </Modal>
        </NavItem>
      </>
    )
  }

  function NavbarEndNotLoggedIn() {
    const NavbarButton = (props) => {
      return(
        <button className='nav-button'>
          <Modal btnLabel={<p>{props.icon} {props.label}</p>} btnClass="nav-button-icon">
            {props.children}
          </Modal>
        </button>
      )
    }

    return (
      <>
      <div className='notLoggedInNavButtons'>
        <NavbarButton icon={<FaUser />} label="Logga in"><Login /></NavbarButton>
        <NavbarButton icon={<FaUserPlus />} label="Registera konto"><Register /></NavbarButton>
      </div>
      </>
    )
  }

  function NavbarLinks() {
    return(
      <ul className='navbar-links'>
        <li>Trådar</li>
        <li>Forum</li>
        <li>Forum</li>
        <li>Medlemmar</li>
      </ul>
    )
  }

  return (
    <nav className="navbar">
    <NavLink to="/">
      <img className='logo' src={logo} alt="" />
    </NavLink>
    <NavbarLinks />

    <ul className="navbar-end">
      {user ? <NavbarEndLoggedIn /> : <NavbarEndNotLoggedIn />}
    </ul>
  </nav>
  );
}

export default Navbar;