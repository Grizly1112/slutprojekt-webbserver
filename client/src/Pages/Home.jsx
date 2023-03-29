import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
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
          socket.current.emit("new-user-add", {username: res.data.username, pfp: res.data.pfp.img || null});
        })
        .catch((err) => {
          console.log("något gick fel");
          throw err;
        });
    } else {
      socket.current.emit("new-user-add", (""));
    }

    socket.current.on("get-users", (users) => {
      setonlineUsers(users);
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
    const userOfEachCategory = useMemo(() => {
      const count = { users: 0, guests: 0 };
      onlineUsers.forEach((userOnline) => {
        if (!userOnline.userId) {
          count.guests++;
        } else if (userOnline.userId !== undefined) {
          count.users++;
        }
      });
      return count;
    }, [onlineUsers]);
  
    return (
      <SideWidget icon={<FaUsers />} title="Användare online" live={true}>
        <>
          <UsersOnline onlineUsers={onlineUsers} userOfEachCategory={userOfEachCategory} />
          <hr />
          <h5 className="totalOnlineUSerLabel">
            Totalt {onlineUsers.length} stycken (Medlemmar: {userOfEachCategory.users}, Gäster: {userOfEachCategory.guests})
          </h5>
          <NavLink to="#" className="viewmore">
            <FaSearch /> Visa alla användare online
          </NavLink>
        </>
      </SideWidget>
    );
  };
  
  const UsersOnline = memo(({ onlineUsers, userOfEachCategory }) => {
    return (
      <div className="usersOnline">
        {onlineUsers.map((userOnline) => {
          if (userOnline.userId && userOnline.userId !== undefined) {
            return (
              <NavLink to={`user/${userOnline.userId}`}>
                <Tooltip key={userOnline.userId} label={userOnline.userId}>
                  <img src={userOnline.pfp || userDefault} className="onlineUsers-img" alt="" />
                </Tooltip>
              </NavLink>
            );
          }
        })}
        {userOfEachCategory.users > 4 && <h4>{userOfEachCategory.users - 4}+ andra</h4>}
      </div>
    );
  });

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
