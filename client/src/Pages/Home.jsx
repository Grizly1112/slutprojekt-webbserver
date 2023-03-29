import React, { memo, useEffect, useRef, useState } from 'react'
import { FaChartBar, FaChartLine, FaChartPie, FaCircleNotch, FaCriticalRole, FaHammer, FaJsSquare, FaMailBulk, FaRedhat, FaSearch, FaUsers } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import './css/Home.css'
import userDefault from '../assets/avatarDefault.png'
import Tooltip from '../components/assets/Tooltip'
import { io } from "socket.io-client";
import { GetUser } from '../api/user'


export default function Home() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [onlineUsers, setonlineUsers] = useState([]);
  const socket = useRef(null);
  const [hasLoadedInOnce,setHasLoadedInOnce] = useState(false)


  // Connect socket server
  useEffect(() => {
    socket.current = io("ws://localhost:3001");

    if (localStorage.getItem('user')) {
      setUserLoggedIn(true);

      GetUser(JSON.parse(localStorage.getItem('user')).userData.username)
        .then(res => {
          setUser(res.data)
          setTimeout(() => setHasLoadedInOnce(true), 1500)
          socket.current.emit("new-user-add", (res.data.username));
        })
        .catch((err) => {
          console.log("något gick fel");
          throw err;
        });
    } else {
      console.log("euueue")
      socket.current.emit("new-user-add", ("guest"));
    }

    socket.current.on("get-users", (users) => {
      setonlineUsers(users);
      console.log("jejeje")
      console.log(users)
    });

    // Cleanup function
    return () => {
      socket.current.disconnect();
    };
  }, []);


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

  const OnlineUserWidget = () => {
    return (
      <SideWidget icon={<FaUsers />} title="Användare online" live={true}>
        <>
          <UsersOnline onlineUsers={onlineUsers} />
          <h5>Totalt {onlineUsers.length} stycken (Medlemmar: 4, Gäster: 3)</h5>
          <NavLink to="#" className="viewmore"><FaSearch /> Visa alla användare online</NavLink>
        </>
      </SideWidget>
    )
  }
  // Memo will memorize the UserOnline state and only rerender whne onlineUser upate and therefore prevent unnecessary rerendering
  const UsersOnline = memo(({ onlineUsers }) => {
    return (
      <div className='usersOnline'>
        {onlineUsers.map((userOnline) => {
          if(userOnline.userId !== 'guest') {
              return(
                <Tooltip label={userOnline.userId}>
                  <img src={userDefault} className="onlineUsers-img" alt="" />
                </Tooltip>
              )
          }
        })}
        {onlineUsers.length > 4 && <h4>{onlineUsers.length - 4}+ andra</h4>}
      </div>
    )
  })

  return (
    <div className={hasLoadedInOnce ? 'home ': "home hasLoadedInOnce"}>
      <div className="left"></div>
      <div className="center"></div>
      <div className="right">
        <OnlineUserWidget />
        <SideWidget icon={<FaMailBulk />} title="Aktiva trådar" />
        <SideWidget icon={<FaChartBar />} title="Forum statistik" />
      </div>
    </div>
  )
}
