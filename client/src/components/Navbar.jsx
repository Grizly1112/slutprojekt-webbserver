import './css/Navbar.css'
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FaBell, FaBolt, FaChevronCircleLeft, FaMailBulk, FaPlus, FaCog, FaChevronRight, FaChevronLeft, FaUserAlt, FaFacebookMessenger, FaMedal, FaStumbleupon, FaDotCircle, FaDemocrat, FaRegCommentAlt, FaRegCommentDots, FaRegUser, FaUserPlus, FaUser, FaUserCircle, FaChevronCircleRight, FaFileArchive, FaQuestion, FaRegQuestionCircle, FaMoon, FaRuler, FaRegNewspaper, FaSun, FaSuitcaseRolling, FaBaby, FaExpandAlt, FaChevronDown, FaClipboard, FaExternalLinkAlt, FaExclamationTriangle, FaFireExtinguisher, FaQuoteLeft, FaFastForward, FaEnvelopeOpenText, FaExternalLinkSquareAlt, FaRegBell, FaConciergeBell, FaToggleOff, FaPowerOff, FaBellSlash, FaRunning, FaHandMiddleFinger, FaInfinity, FaLevelDownAlt, FaHandshake, FaHandshakeSlash, FaArrowDown } from 'react-icons/fa';
import Modal from './assets/Modal';
import Utils from '../assets/functiions/Utils'
import Tooltip from './assets/Tooltip';
import Login from './Login';
import Register from './Register';
import logo from '../assets/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { checkAuthLevel } from '../assets/functiions/Auth';

// Test
import UserPfpTest from '../assets/avatarDefault.png'
import { GetUser } from '../api/user';
import { Loader } from './assets/Loader';

// Källkod: https://www.youtube.com/watch?v=IF6k0uZuypA&t=382s
// Inspiration Gymansiearbete Valeria forum

function Navbar() {
  const [notificationCount, SetNotificationCount] = useState(0);
  const resetNotifications = () => SetNotificationCount(0);

  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // För animationen


  useEffect(() => {
    if(localStorage.getItem('user') && checkAuthLevel(JSON.parse(localStorage.getItem('user')).token, 0)) {
      setUserLoggedIn(true)
      
      GetUser(JSON.parse(localStorage.getItem('user')).userData.username).then(res => {
        setUser(res.data)
        setTimeout(() => setIsLoading(false), 450)
      }).catch((err) => {
        try {

            if(err.response.status === 404) {
                console.log("kunde inte hitta")
                setNoUserFound(true)
            } else if(err.response.status === 500) {
              setServerError(true);
                console.log("Server error")
            }
        } catch(err) {
            setServerError(true)
          }
        });
  } 
}, [])


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
      let navigate = useNavigate();
   
      const NavbarModalitem = (props) => {
        return(
        <div className='navbarModal-item title' onClick={() => props.func ? props.func(): null}>
          <i className="navbarModal-item-icon-left">{props.iconleft}</i>
          <h4 className='navbarModal-label'>{props.label}</h4>
          <i className="navbarModal-item-icon-right">{props.iconRight}</i>
        </div>
        )
      }

      return(
        <>
          <div className='navbarModal'>
            {/* <NavLink className='navbarModalNavLink' to={`/user/${user.username}`} onClick={() => { setTimeout(forceUpdate(), 1)}}> */}
            <NavLink className='navbarModalNavLink' to={`/user/${user.username}`}>
              <NavbarModalitem iconleft={<FaUserCircle />} label={"Ditt konto"}iconRight={<FaChevronCircleRight />}/>
            </NavLink>
              
            
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
  
            <NavLink className='navbarModalNavLink' to="/terms">
              <NavbarModalitem iconleft={<FaRegNewspaper />} label={"Användarvilkor"} iconRight={<FaExternalLinkAlt />}/>
            </NavLink>
  
            <NavbarModalitem iconleft={<FaRegQuestionCircle />} label={"Hjälp"} iconRight={<FaExternalLinkAlt />}/>
            <hr />
            <NavbarModalitem iconleft={<FaRunning />} label={"Logga ut"} func={Utils.Logout} iconRight={<FaChevronCircleRight />}/>
          </div>
        </>
      )
    }

    return (
      <>
        <NavItem>
          <Modal btnLabel={<FaPlus />} btnClass="icon-button" activeClass="active-navbar-button" tooltip="Skapa">
            <div className='navbarModal'>Chat</div>
          </Modal>
        </NavItem>

        <NavItem>
          <Modal btnLabel={<FaRegCommentDots />} btnClass="icon-button" activeClass="active-navbar-button" tooltip="Direktmeddelanden">
            <div className='navbarModal'>Chat</div>
          </Modal>
        </NavItem>

        <NavItem notifications={(notificationCount > 0) ? notificationCount : null}>
          <Modal btnLabel={<FaBell className={(notificationCount > 0) ? 'notificationbell': null} />} btnClass="icon-button" activeClass="active-navbar-button" tooltip="Aviseringar" func={resetNotifications}>
            <div className='navbarModal'>
            </div>
          </Modal>
        </NavItem>

        {
          isLoading ? 
          <NavItem>
            <Loader />
          </NavItem>
          :
          <NavItem>
          <Modal btnLabel={<img src={
            user.pfp ? user.pfp.img : UserPfpTest
            } />} btnClass="icon-button" activeClass="active-navbar-button">
            <UserModal />
          </Modal>
        </NavItem>
        }
      </>
    )
  }

  function NavbarEndNotLoggedIn() {
    if((window.location.href.indexOf("login") > -1) || (window.location.href.indexOf("register") > -1)) {
      const NavbarButton = (props) => {
        return(
        <>
        <NavLink className='nav-button' to={props.link}>
            <div className='nav-button-icon'>
            <p>
              {props.icon} {props.label}
              </p>
            </div>
        </NavLink>
        </>
        )
      }
      return (
      <>
        <div className='notLoggedInNavButtons'>
          <NavbarButton icon={<FaUser />} link={"/login"} label="Logga in"><Login /></NavbarButton>
          <NavbarButton icon={<FaUserPlus />} link={"/register"} label="Registera konto"><Register /></NavbarButton>
        </div>
      </>
      )
    } else {
      const NavbarButton = (props) => {
        return(
          <>
          {
            <button className='nav-button'>
            <Modal btnLabel={<p>{props.icon} {props.label}</p>} btnClass="nav-button-icon">
              {props.children}
            </Modal>
          </button>
          }
        </>
        )
      }
      return (
        <>
        <div className='notLoggedInNavButtons'>
          <NavbarButton icon={<FaUser />}  label="Logga in"><Login /></NavbarButton>
          <NavbarButton icon={<FaUserPlus />} label="Registera konto"><Register /></NavbarButton>
        </div>
        </>
      )
    }   
  }

  function NavbarLinks() {
    return(
      <ul className='navbar-links'>
        <NavLink to="/">Startskärm</NavLink>
        <NavLink to="/groups">Grupper</NavLink>
        <NavLink to="/user">Medlemmar</NavLink>
        <NavLink to="/tickets">Tickets</NavLink>
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
      {userLoggedIn ? <NavbarEndLoggedIn /> : <NavbarEndNotLoggedIn />}
    </ul>
  </nav>
  );
}

export default Navbar;