import React, { memo, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FaChartBar, FaChartLine, FaChartPie, FaCircleNotch, FaCloud, FaCriticalRole, FaGlobeEurope, FaHammer, FaHashtag, FaJsSquare, FaMailBulk, FaPaperPlane, FaRedhat, FaSearch, FaSun, FaUsers } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import './css/Home.css'
import userDefault from '../../assets/avatarDefault.png'
import Tooltip from '../../components/assets/Tooltip'
import { io } from "socket.io-client";
import { GetForumStatistics, GetUser } from '../../api/user'
import { userContext } from '../../context/UserContext'
import GlobalChat from './GlobalChat'
import Clock from './Clock'
import Utils from '../../assets/functiions/Utils'
import axios from 'axios'
import { GetWeatherData } from '../../api/other'

export default function Home() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [onlineUsers, setonlineUsers] = useState([]);
  const socket = useRef(null);
  const [hasLoadedInOnce,setHasLoadedInOnce] = useState(false)
  
  const contextValue = useContext(userContext)

  useEffect(() => 
  {
    socket.current = io("ws://localhost:3001");
      if(contextValue.user) {
      socket.current.emit("new-user-add", {username: contextValue.user.username, pfp: contextValue.user.pfp && contextValue.user.pfp.img ? contextValue.user.pfp.img : ""});
    }
    else {
      socket.current.emit("new-user-add", (""));
    }
    socket.current.on("get-users", (users) => {
      setonlineUsers(users);
    });
    return () => {
      socket.current.disconnect();
    }
  }, [contextValue])


  const SideWidget = (props) => {
    return(
      <div className='sideWidget'>
        <div className="header">
          {props.icon}
          <h4>{props.title}</h4>
          { props.live && <div className="circle"></div> }
        </div>
          <hr />
        <div className='Widget-body'>
          { props.children }
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
      <SideWidget icon={<FaUsers />} title="Användare online" live={false}>
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
              <NavLink to={`members/user/${userOnline.userId}`}>
                <Tooltip key={userOnline.userId} label={userOnline.userId}>
                  <img src={userOnline.pfp ? Utils.FormatImageStr(userOnline.pfp.data.data) : userDefault} className="onlineUsers-img" alt="pfp" />
                </Tooltip>
              </NavLink>
            );
          }
        })}
        {userOfEachCategory.users > 4 && <h4>{userOfEachCategory.users - 4}+ andra</h4>}
      </div>
    );
  });

  const [forecast, setForecast] = useState()

  useEffect(() => {
    GetWeatherData().then(res => {
      setForecast(res)
      console.log(res)
    })
  },[])

  // Maps the API's icons to the ones from https://erikflowers.github.io/weather-icons/
  var weatherIconsMap = {
    "01d": "wi-day-sunny",
    "01n": "wi-night-clear",
    "02d": "wi-day-cloudy",
    "02n": "wi-night-cloudy",
    "03d": "wi-cloud",
    "03n": "wi-cloud",
    "04d": "wi-cloudy",
    "04n": "wi-cloudy",
    "09d": "wi-showers",
    "09n": "wi-showers",
    "10d": "wi-day-hail",
    "10n": "wi-night-hail",
    "11d": "wi-thunderstorm",
    "11n": "wi-thunderstorm",
    "13d": "wi-snow",
    "13n": "wi-snow",
    "50d": "wi-fog",
    "50n": "wi-fog"
  };

  return (
    <>
     <div className={hasLoadedInOnce ? 'home ': "home hasLoadedInOnce"}>
      <div className="left"></div>
      <div className="center">
        <GlobalChat user={contextValue.user} />
      </div>
      <div className="right">
        <OnlineUserWidget />
        <SideWidget icon={<FaGlobeEurope />} title={Utils.FormatTimezoneString()} live={true}>
          <Clock />
        </SideWidget>
        {
          forecast &&
          <SideWidget icon={null} title={`Väderleksrapport`} />
          // <SideWidget icon={
            // <img src={`https://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}.png`} />
          // } title={`Väderleksrapport ${forecast ? forecast.city.name: null}`}>
                
          // </SideWidget>

        }

        <SideWidget icon={<FaChartBar />} title="Statistik">
        </SideWidget>
      </div>
    </div>
    </>
  )
}
