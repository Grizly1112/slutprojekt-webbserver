import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FaChartBar, FaCloud, FaCloudMoon, FaCloudRain, FaCloudShowersHeavy, FaCloudSun, FaGlobeEurope, FaMoon, FaSearch, FaSnowflake, FaSun, FaTemperatureHigh, FaUsers, FaWind } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import './css/Home.css'
import userDefault from '../../assets/avatarDefault.png'
import Tooltip from '../../components/assets/Tooltip'
import { io } from "socket.io-client";
import { userContext } from '../../context/UserContext'
import GlobalChat from './GlobalChat'
import Clock from './Clock'
import Utils from '../../assets/functiions/Utils'
import { GetVisitingCount, GetWeatherData } from '../../api/other'

export default function Home() {
  const [onlineUsers, setonlineUsers] = useState([]);

  const [forecast, setForecast] = useState(null);
  const [visitors, setVisitors] = useState(null);
  
  const socket = useRef(null);
  const contextValue = useContext(userContext)
  // SRC (Socket IO): https://youtu.be/EKP-m6rbT1E

  useEffect(() => 
  {
    socket.current = io("ws://localhost:3001");
    if(contextValue.user) {
      socket.current.emit("new-user-add", {
        username: contextValue.user.username, 
        pfp: contextValue.user.pfp ? contextValue.user.pfp : "",
      });
    }
    else {
      socket.current.emit("new-user-add", (""));
    }
    socket.current.on("get-users", (users) => {
      setonlineUsers(users);
    });
    
    // Cleanup function
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
    // Function to update onlineUserCount;
    // Note: by using memo the component only rerender when onlineUsers Update => better performance
    const userOfEachCategory = useMemo(() => {
      // Note: reduce allows us to calculate both the users and guests values in a single loop by accumulating them in a single object
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
      <SideWidget icon={<FaUsers />} title="Realtids besökare" live={true}>
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
    const onlineUsersList = React.useMemo(() =>
      onlineUsers.filter(userOnline => Boolean(userOnline.userId)),
      [onlineUsers]
    );
    const renderOnlineUser = React.useCallback((userOnline) => {
      console.log(userOnline)
      return (
        <NavLink to={`members/user/${userOnline.userId}`}>
          <Tooltip key={userOnline.userId} label={userOnline.userId}>
            <img src={userOnline.pfp ? ('data:image/png;base64,' + userOnline.pfp.data) : userDefault} className="onlineUsers-img" alt="pfp" />
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


  useEffect(() => {
    // cancellation token to prevent memory leaks and unwanted side effects 
    // & also prevent from unnecessarily update state
    let isCancelled = false;

    // Fetch weatherData
    const fetchWeatherData = async () => {
      if(!isCancelled) {
        const res = await GetWeatherData();
        setForecast(res);
      }
    };
    
    // Fech VisitorCount 
    const fetchVisitorCount = async () => {
      if(!isCancelled) {
        const res = await GetVisitingCount();
        setVisitors(res.data.visitors);
      }
    };
    
    // Call both functions
    fetchWeatherData();
    fetchVisitorCount();


    /* This is a cleanup function that is returned from the `useEffect`*/
    return() => {
      isCancelled = true;
    }

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
    "11d": <FaCloud />, // Thunder, no icon yet
    "11n": <FaCloud />,
    "13d": <FaSnowflake />,
    "13n": <FaSnowflake />,
    "50d": <FaCloud />, // Fog, no icon yet
    "50n": <FaCloud />,
  };
  
  // Define the header of the clock widget 
  const TimeAndWeatherHeader = () => {
    // return false if weather api response is not defined
    if (!forecast) return null;
    return (
      <div className="forecast">
        {forecast.name}
        <Tooltip label={<p><FaWind /> {forecast.wind.speed} m/s </p>}>
          {/* Children => header title */}
          {weatherIconsMap[forecast.weather[0].icon]}
          {Utils.ConvertKelvinToCelsius(forecast.main.temp)}°C
        </Tooltip>
      </div>
    );
  };
  
  return (
    <div className={`home`}>
      <div className='left'></div>
      <div className='center'>
        <GlobalChat user={contextValue.user} />
      </div>

      {/* Homepage widgets */}
      <div className='right'>
        <OnlineUserWidget />
        
        {forecast && (
          <SideWidget
            icon={<FaGlobeEurope />}
            title={<TimeAndWeatherHeader />}
            live={false}>
            <Clock />
          </SideWidget>
        )}
        
        <SideWidget icon={<FaChartBar />} title='Statistik'>
          {visitors && (
            <div className='statistic-contianer'>
              <h5>Unika besökare: {visitors.countUnique}</h5>
              <h5>Återkommande besökare: {visitors.countRecurent}</h5>
            </div>
          )}
        </SideWidget>
      </div>
    </div>
	);};