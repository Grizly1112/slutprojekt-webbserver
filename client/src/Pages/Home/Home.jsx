import React, { memo, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FaChartBar, FaChartLine, FaChartPie, FaCircle, FaCircleNotch, FaCloud, FaCloudMoon, FaCloudRain, FaCloudShowersHeavy, FaCloudSun, FaCriticalRole, FaGlobeEurope, FaHammer, FaHashtag, FaJsSquare, FaMailBulk, FaMoon, FaPaperPlane, FaRedhat, FaRegSun, FaSearch, FaSnowflake, FaSun, FaTemperatureHigh, FaUsers } from 'react-icons/fa'
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
    })
  },[])

  // https://openweathermap.org/weather-conditions
  // Return icon depending on weather condition
  // Alla iconer finns inte 
  var weatherIconsMap = {
    "01d":  <FaSun style={{color: "rgb(255, 230, 32)"}} />,
    "01n":  <FaMoon style={{color: "rgb(255, 230, 32)"}}/>,
    "02d":  <FaCloudSun />,
    "02n": <FaCloudMoon />,
    "03d":<FaCloud />,
    "03n":<FaCloud />,
    "04d": <FaCloud />,
    "04n": <FaCloud />,
    "09d": <FaCloudShowersHeavy />,
    "09n": <FaCloudShowersHeavy />,
    "10d": <FaCloudRain />,
    "10n": <FaCloudRain />,
    // Thunder
    "11d": <FaCloud />,
    "11n": <FaCloud />,
    "13d": <FaSnowflake />,
    "13n":  <FaSnowflake />,
    // Fog
    "50d":  <FaCloud />,
    "50n": <FaCloud />
  };

  const TimeAndWeatherHeader = () => {
    return(
      <div className='forecast'>
      {/* https://www.toptal.com/designers/htmlarrows/symbols/degree-celsius/: Degree icon using hex-code*/}
      {forecast.name}
      {/* <FaCircle className='forecast-circle'/> */}
      {weatherIconsMap[forecast.weather[0].icon]}
      {Utils.ConvertKelvinToCelsius(forecast.main.temp)}<span>&#xb0;C</span>
      </div>
    )
  }

  return (
    <>
     <div className={hasLoadedInOnce ? 'home ': "home hasLoadedInOnce"}>
      <div className="left"></div>
      <div className="center">
        <GlobalChat user={contextValue.user} />
      </div>
      <div className="right">
        <OnlineUserWidget />
        {
          forecast &&
          // <SideWidget icon={<FaTemperatureHigh />} title={`Väderleksrapport i ${forecast.name}`}>
          //   <div className='forecast'>
          //   {/* https://www.toptal.com/designers/htmlarrows/symbols/degree-celsius/: Degree icon using hex-code*/}
          //   <h2>{weatherIconsMap[forecast.weather[0].icon]}</h2>
          //   <h2>{Utils.ConvertKelvinToCelsius(forecast.main.temp)}<span>&#xb0;C</span></h2>
          //   </div>

          // </SideWidget>
          <SideWidget icon={<FaGlobeEurope />} title={<TimeAndWeatherHeader />} live={true}>
          <Clock />
        </SideWidget>


        }
       
        <SideWidget icon={<FaChartBar />} title="Statistik">
        </SideWidget>
      </div>
    </div>
    </>
  )
}
