import './css/Navbar.css'
import React, { useState, useEffect, useRef, useContext, Suspense, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FaUserCircle, FaChevronCircleRight, FaHandshake, FaUser, FaUserPlus, FaHandshakeSlash, FaRegBell, FaBellSlash, FaRegSun, FaRegMoon, FaCog, FaExternalLinkAlt, FaRegNewspaper, FaRegQuestionCircle, FaRunning, FaPlus, FaRegCommentDots, FaBell } from 'react-icons/fa';
import Modal from './assets/Modal';
import Utils from '../assets/functiions/Utils'
import Tooltip from './assets/Tooltip';
import Login from './Login';
import Register from './Register';
import logo from '../assets/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { checkAuthLevel } from '../assets/functiions/Auth';
import { userContext } from '../context/UserContext';

// Test
import UserPfpTest from '../assets/avatarDefault.png'
import { GetUser } from '../api/user';
import { Loader } from './assets/Loader';

// Källkod: https://www.youtube.com/watch?v=IF6k0uZuypA&t=382s
// Inspiration Gymansiearbete Valeria forum

function Navbar(props) {
  const contextValue = useContext(userContext)

  const [notificationCount, SetNotificationCount] = useState(3);
  const resetNotifications = () => SetNotificationCount(0);

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [contextLoaded, setContextLoaded] = useState(false);
 
  useEffect(() => {
    setTimeout(() => setContextLoaded(true), 250);

    if(contextValue.user) {
      setUser(contextValue.user)
      setIsLoading(false)
      if(user.pfp) setUser({...user, userHasPfp: true})

    } 

  },[contextValue])


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
      const [theme, setTheme] = useState("");
      console.log(theme)
      const [status, setStatus] = useState(true);
      const [notifactions, setNotifiactions] = useState(true);
      let navigate = useNavigate();
   
      const NavbarModalitem = useCallback((props) => (
        <div className="navbarModal-item title" onClick={props.func ? props.func : null}>
          <i className="navbarModal-item-icon-left">{props.iconleft}</i>
          <h4 className="navbarModal-label">{props.label}</h4>
          <i className="navbarModal-item-icon-right">{props.iconRight}</i>
        </div>
      ), []);

      return(
        <>
          <div className='navbarModal'>
            {/* <NavLink className='navbarModalNavLink' to={`/user/${user.username}`} onClick={() => { setTimeout(forceUpdate(), 1)}}> */}
            <NavLink className='navbarModalNavLink' to={`/members/user/${user.username}`}>
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
            
             <NavbarModalitem iconleft={ !theme ? <FaRegSun /> : <FaRegMoon />} label={!theme ? "Ljust": "Mörkt"}iconRight={
              <>
              <label className="switch">
                <input type="checkbox"defaultChecked={theme} onChange={()=> setTimeout(() => {
                  setTheme(theme ? false : true)
                  console.log(theme)
                  localStorage.setItem('theme', JSON.stringify({theme: theme ? false : true}))
                  document.documentElement.setAttribute('data-dark-mode', theme ? 'false' : 'true');
                }, 200) }/>
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
            <NavbarModalitem iconleft={<FaRunning />} label={"Logga ut"} func={contextValue.logout} iconRight={<FaChevronCircleRight />}/>
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
          (!isLoading && user.userHasPfp) ? 
          <NavItem>
            <Modal btnLabel={<img src={
              user.pfp ? user.pfp.img : UserPfpTest
              } />} btnClass="icon-button" activeClass="active-navbar-button">
              <UserModal />
            </Modal>
          </NavItem>
          :
          <NavItem>
            <Loader />
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
        <NavLink to="/"> Startskärm</NavLink>
        <NavLink to="/groups">Grupper</NavLink>
        <NavLink to="/members">Medlemmar</NavLink>
        <NavLink to="/tickets">Tickets</NavLink>
      </ul>
    )
  }

  return contextLoaded && (
    <nav className="navbar">
      <NavLink to="/">
        <img className="logo" src={logo} alt="" />
      </NavLink>
      <NavbarLinks />
      <ul className="navbar-end">
        {Object.keys(user).length > 0 ? (
          <NavbarEndLoggedIn />
        ) : (
          <NavbarEndNotLoggedIn />
        )}
      </ul>
    </nav>
  );

}

export default Navbar;