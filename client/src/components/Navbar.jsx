

import './css/Navbar.css'
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FaBell, FaBolt, FaChevronCircleLeft, FaMailBulk, FaPlus, FaCog, FaChevronRight, FaChevronLeft, FaUserAlt, FaFacebookMessenger, FaMedal, FaStumbleupon, FaDotCircle, FaDemocrat, FaRegCommentAlt, FaRegCommentDots } from 'react-icons/fa';
import Modal from './Modal';


// Källkod: https://www.youtube.com/watch?v=IF6k0uZuypA&t=382s
// Inspiration Gymansiearbete Valeria forum


function Navbar() {

    const [notificationCount, setNotificationCount] = useState(1);

    return (
      <NavbarContainer>
        
        {/* <NavItem icon={<FaPlus />} /> */}
        {/* <NavItem icon={<FaMailBulk />} /> */}

        <NavItem>
            <Modal btnLabel={<FaRegCommentDots />} btnClass="icon-button-icon">
            <div className='notifyModal'>Chat</div>
            </Modal>
        </NavItem>


        <NavItem notifications={(notificationCount > 0) ? notificationCount : null}>
            <Modal btnLabel={<FaBell />} btnClass="icon-button-icon">
                <div className='notifyModal'>Jalla</div>
            </Modal>
        </NavItem>

      
        <NavItem>
            <Modal btnLabel={<FaUserAlt />} btnClass="icon-button-icon">
                <DropdwonMenu></DropdwonMenu>
            </Modal>
        </NavItem>
      

        
        {/* <NavItem icon={null}> */}
          {/* <DropdownMenu></DropdownMenu> */}
        {/* </NavItem> */}
      </NavbarContainer>
    );
  }
  
  function NavbarContainer(props) {
    return (
      <nav className="navbar">
        <ul className="navbar-nav">{props.children}</ul>
      </nav>
    );
  }
  
  function NavItem(props) {
    // const [open, setOpen] = useState(false);

    function formatNotificationCount(count) {
        if(count > 9 && count < 99) {
            return(`9+`)
        } else if(count > 99) {
            return(`99+`)
        } else {
        return(`${count}`)
        }
    }
  
    return (
      <li className="nav-item">
        {props.notifications ? 
        <span className='navbar-notification-count'>{formatNotificationCount(props.notifications)}</span> 
        : null }   
        {/* <a href="#" className="icon-button" onClick={() => setOpen(!open)}> */}
        <a href="#" className="icon-button">
          {props.children}
        </a>
  
        {/* {open && props.children} */}
      </li>
    );
  }
  
//   function DropdownMenu() {
//     const [activeMenu, setActiveMenu] = useState('main');
//     const [menuHeight, setMenuHeight] = useState(null);
//     const dropdownRef = useRef(null);
  
//     useEffect(() => {
//       setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
//     }, [])
  
//     function calcHeight(el) {
//       const height = el.offsetHeight;
//       setMenuHeight(height);
//     }
  
//     function DropdownItem(props) {
//       return (
//         <span href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
//           <span className="icon-button">{props.leftIcon}</span>
//           {props.children}
//           <span className="icon-right">{props.rightIcon}</span>
//         </span>
//       );
//     }
  
//     return (
//       <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
  
//         <CSSTransition
//           in={activeMenu === 'main'}
//           timeout={500}
//           classNames="menu-primary"
//           unmountOnExit
//           onEnter={calcHeight}>
//           <div className="menu">
//             <DropdownItem>My Profile</DropdownItem>
//             <DropdownItem
//               leftIcon={<FaCog />}
//               rightIcon={<FaChevronRight />}
//               goToMenu="settings">
//               Settings
//             </DropdownItem>
//             <DropdownItem
//               leftIcon="🦧"
//               rightIcon={<FaChevronRight />}
//               goToMenu="animals">
//               Animals
//             </DropdownItem>
  
//           </div>
//         </CSSTransition>
  
//         <CSSTransition
//           in={activeMenu === 'settings'}
//           timeout={500}
//           classNames="menu-secondary"
//           unmountOnExit
//           onEnter={calcHeight}>
//           <div className="menu">
//             <DropdownItem goToMenu="main" leftIcon={<FaChevronLeft />}>
//               <h2>My Tutorial</h2>
//             </DropdownItem>
//             <DropdownItem leftIcon={<FaBolt />}>HTML</DropdownItem>
//             <DropdownItem leftIcon={<FaBolt />}>CSS</DropdownItem>
//             <DropdownItem leftIcon={<FaBolt />}>JavaScript</DropdownItem>
//             <DropdownItem leftIcon={<FaBolt />}>Awesome!</DropdownItem>
//           </div>
//         </CSSTransition>
  
//         <CSSTransition
//           in={activeMenu === 'animals'}
//           timeout={500}
//           classNames="menu-secondary"
//           unmountOnExit
//           onEnter={calcHeight}>
//           <div className="menu">
//             <DropdownItem goToMenu="main" leftIcon={<FaChevronLeft />}>
//               <h2>Animals</h2>
//             </DropdownItem>
//             <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
//             <DropdownItem leftIcon="🐸">Frog</DropdownItem>
//             <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
//             <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
//           </div>
//         </CSSTransition>
//       </div>
//     );
//   }

function DropdwonMenu() {
    const [mainDrop, setMainDrop] = useState(true);

    const handleDrop = () => {
    //    setMainDrop(!mainDrop)
       console.log(mainDrop)
    }


    function DropdownItem(props){
      return(
        <span href="#" className="menu-item" id="menu-item" onClick={() => {
            console.log("eueuue")
         try{
          props.action();
         } catch (err) {
          throw err;
         };
        }}>
          <span className="material-icons icon-button" id="nav-item">
           {props.leftIcon}
          </span>
          {props.label}
          <span className="material-icons icon-right"  id="nav-item">
            {props.rightIcon}
          </span>
        </span>
      );
    };


    const DropDownMain = () => {
      return(
      <>
        <DropdownItem label={"Inställningar"} leftIcon={"settings"} rightIcon={"arrow_forward_ios"} action={handleDrop} />
     {/* {/*} <DropdownItem> My Profile </DropdownItem> 
        <DropdownItem label={"Profil"} leftIcon={"user"} rightIcon={null} action={null} />
        <DropdownItem label={"Logga ut"} leftIcon={"logout"} rightIcon={null} action={null} /> */}
        <h1>Main</h1>
      </>
      );
    }

    const DropDownSettings = () => {
      return(
        <>
        {/* <DropdownItem label={"Gå Tillbaka"} leftIcon={"arrow_back"} rightIcon={null} action={handleDrop} />
        <DropdownItem label={"Inställning 1 "} leftIcon={"light_mode"} rightIcon={null} action={null} />
        <DropdownItem label={"Inställning 2 "} leftIcon={"light_mode"} rightIcon={null} action={null} />
        <DropdownItem label={"Inställning 3... "} leftIcon={"light_mode"} rightIcon={null} action={null} />
    */}
        <h1>Settings</h1>
        </> 
      )
    }
  
    return(
      <> 
      <div className="dropdown" id="dropdown">
       { mainDrop ? 
       <DropDownMain />
       :
        <DropDownSettings />
       }
      </div>
      </>
    );
  };
  
  export default Navbar;