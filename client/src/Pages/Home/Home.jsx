import React, { memo, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FaChartBar, FaCloud, FaCloudMoon, FaCloudRain, FaCloudShowersHeavy, FaCloudSun, FaGlobeEurope, FaMoon, FaSearch, FaSnowflake, FaSun, FaUsers } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import './css/Home.css'
import userDefault from '../../assets/avatarDefault.png'
import Tooltip from '../../components/assets/Tooltip'
import { io } from "socket.io-client";
import { userContext } from '../../context/UserContext'
import GlobalChat from './GlobalChat'
import Clock from './Clock'
import Utils from '../../assets/functiions/Utils'
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


  const SideWidget = ({ icon, title, live, children }) => {
    return(
      <div className='sideWidget'>
        <div className='header'>
          {icon}
          <h4>{title}</h4>
          {live && <div className='circle' />}
        </div>
        <hr />
        <div className='Widget-body'>{children}</div>
      </div>
    )
  }

  const OnlineUserWidget = () => {
    const userOfEachCategory = useMemo(() => {
      return onlineUsers.reduce((count, userOnline) => {
        if (!userOnline.userId) {
          count.guests++;
        } else if (userOnline.userId !== undefined) {
          count.users++;
        }
        return count;
      }, { users: 0, guests: 0 });
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
  const UsersOnline = React.memo(({ onlineUsers, userOfEachCategory }) => {
    const onlineUsersList = React.useMemo(() => {
      return onlineUsers.filter(userOnline => userOnline.userId && userOnline.userId !== undefined)
    }, [onlineUsers])
  
    const renderOnlineUser = React.useCallback((userOnline) => {
      return (
        <NavLink to={`members/user/${userOnline.userId}`}>
          <Tooltip key={userOnline.userId} label={userOnline.userId}>
            <img src={userOnline.pfp ? Utils.FormatImageStr(userOnline.pfp.data.data) : userDefault} className="onlineUsers-img" alt="pfp" />
          </Tooltip>
        </NavLink>
      );
    }, [])
  
    return (
      <div className="usersOnline">
        {onlineUsersList.map(renderOnlineUser)}
        {userOfEachCategory.users > 4 && <h4>{userOfEachCategory.users - 4}+ andra</h4>}
      </div>
    );
  });
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
   const fetchWeatherData = async () => {
    const res = await GetWeatherData();
    setForecast(res);
     };
    fetchWeatherData();
  }, []);
  
  // Matching weatherApiIcons with out icon package
  // note: not all weather conditions habe their unique icon, not enought free icons
  const weatherIconsMap = {
    "01d": <FaSun style={{ color: "rgb(255, 230, 32)" }} />,
    "01n": <FaMoon style={{ color: "rgb(255, 230, 32)" }} />,
    "02d": <FaCloudSun />,
    "02n": <FaCloudMoon />,
    "03d": <FaCloud />,
    "03n": <FaCloud />,
    "04d": <FaCloud />,
    "04n": <FaCloud />,
    "09d": <FaCloudShowersHeavy />,
    "09n": <FaCloudShowersHeavy />,
    "10d": <FaCloudRain />,
    "10n": <FaCloudRain />,
    "11d": <FaCloud />, // Thunder
    "11n": <FaCloud />,
    "13d": <FaSnowflake />,
    "13n": <FaSnowflake />,
    "50d": <FaCloud />, // Fog
    "50n": <FaCloud />,
  };
  
  // Define the header of the clock widget 
  const TimeAndWeatherHeader = () => {
    // return false if weather api response is not defined
    if (!forecast) return null;
    return (
      <div className="forecast">
        {forecast.name}
        {weatherIconsMap[forecast.weather[0].icon]}
        {Utils.ConvertKelvinToCelsius(forecast.main.temp)}
        <span>°C</span>
      </div>
    );
  };
  
  return (
  <>
    <div className={`home ${hasLoadedInOnce ? "" : "hasLoadedInOnce"}`}>
      <div className="left"></div>
      <div className="center">
      <GlobalChat user={contextValue.user} />
      </div>
      {/* Homepage widgets */}
      <div className="right">
      <OnlineUserWidget />
      {forecast && (
        <SideWidget
        icon={<FaGlobeEurope />}
        title={<TimeAndWeatherHeader />}
        live={true}
        >
        <Clock />
        </SideWidget>
      )}
      <SideWidget icon={<FaChartBar />} title="Statistik" />
    </div>
  </div>
  </>
  )};