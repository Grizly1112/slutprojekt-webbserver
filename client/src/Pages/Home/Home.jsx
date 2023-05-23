import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FaChartBar, FaCloud, FaCloudMoon, FaCloudRain, FaCloudShowersHeavy, FaCloudSun, FaComments, FaEye, FaFileAudio, FaGlobeEurope, FaMoon, FaMusic, FaSearch, FaShareAlt, FaSnowflake, FaSun, FaThumbsUp, FaThumbtack, FaUserAlt, FaUserAstronaut, FaUsers, FaWind } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import './css/Home.css'
import userDefault from '../../assets/avatarDefault.png'
import Tooltip from '../../components/assets/Tooltip'
import { io } from "socket.io-client";
import { userContext } from '../../context/UserContext'
import logo from '../../assets/logo2.png'
import Muscilogo from '../../assets/music.png'
import Modal from '../../components/assets/Modal'
import Clock from './Clock'
import Utils from '../../assets/functiions/Utils'
import { GetVisitingCount, GetWeatherData } from '../../api/other'
import ShareModal from '../../components/ShareModal'
import LiveIcon from '../../components/assets/LiveIcon'
export default function Home() {
  document.title ="Mag Music Forum | Startskärm"

  const [onlineUsers, setonlineUsers] = useState([]);

  const [forecast, setForecast] = useState(null);
  const [statistics, setStatistics] = useState(null);
  
  const socket = useRef(null);
  const contextValue = useContext(userContext)
  // SRC (Socket IO): https://youtu.be/EKP-m6rbT1E

  useEffect(() => 
  {
    // Connect to socket - server
    socket.current = io("ws://localhost:3001");
    if(contextValue.user) {
      // If user logged in add new user with userData
      socket.current.emit("new-user-add", {
        username: contextValue.user.username, 
        pfp: contextValue.user.pfp ? contextValue.user.pfp : "",
      });
    }
    else {
      // Add as a guest => no userData
      socket.current.emit("new-user-add", (""));
    }

    // Listener for when userlist updates on socket server
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
          {live && <LiveIcon live={true} width={12} height={12}/>}
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
      let users = 0;
      let guests = 0;
    
      onlineUsers.forEach((userOnline) => {
        if (userOnline.userId === "" || userOnline.userId.startsWith("guest-")) {
          guests++;
        } else {
          users++;
        }
      });
    
      return { users, guests };
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

    // Funktion to filter out guests from onlineUSerList
    const onlineUsersList = React.useMemo(() =>
    onlineUsers.filter(userOnline => !userOnline.userId.startsWith("guest-") && userOnline.userId !== ""),
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
        {onlineUsersList.length > 0 && userOfEachCategory.users > 4 && <h4>{userOfEachCategory.users - 4}+ andra</h4>}
      </div>
    );
  });


  useEffect(() => {

    // Fetch weatherData
    const fetchWeatherData = async () => {
        const res = await GetWeatherData();
        setForecast(res);
    };
    
    // Fech VisitorCount 
    const fetchVisitorCount = async () => {
        const res = await GetVisitingCount();
        setStatistics(res.data);
    };
    
    // Call both functions
    fetchWeatherData();
    fetchVisitorCount();
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
    if (!forecast) return
  
    const { name, weather, wind, main } = forecast;
  
    const temperatureCelsius = Utils.ConvertKelvinToCelsius(main.temp);
    const weatherIcon = weatherIconsMap[weather[0].icon];
  
    return (
      <div className="forecast">
        {name}
        <Tooltip label={<p><FaWind /> {wind.speed} m/s </p>}>
          {weatherIcon}
          {temperatureCelsius}°C
        </Tooltip>
      </div>
    );
  };

  const statusMsgArray = [
    {
      id: 1,
      title: "Nya konto funktioner",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas expedita modi, esse vitae incidunt minus veritatis reprehenderit explicabo sint. Incidunt dolor aliquid laboriosam minima, ullam facere fugit quod debitis adipisci?",
      creator: {
        username: "Grizly",
        pfp: "https://media.discordapp.net/attachments/782931346603114496/1096401873222774824/Tj3MU.png"
      },
      img: "https://media.discordapp.net/attachments/782931346603114496/1096011579830571038/image.png?width=1202&height=676"
      
    },
    {
      id: 1,
      title: "Nya konto funktioner",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas expedita modi, esse vitae incidunt minus veritatis reprehenderit explicabo sint. Incidunt dolor aliquid laboriosam minima, ullam facere fugit quod debitis adipisci?",
      creator: {
        username: "Grizly",
        pfp: "https://media.discordapp.net/attachments/782931346603114496/1096401873222774824/Tj3MU.png"
      },
      img: "https://media.discordapp.net/attachments/782931346603114496/1096011579830571038/image.png?width=1202&height=676"
      
    },
  ]
  
  const NewsPreview =  (props) => {
    return(
      <div className="news-preivew">
        
        <div className="news-preview-container">
        
            <div className="news-creator-title">
        <div className="creator-pfp">
          <img src={props.creator.pfp} />
        </div>
              <h4 className='news-creator-username'>Grizly</h4>
              <div className="staffBadge">Moderator</div> 
              <h5 className='news-creator-timestand'>12/4/2023 15:09</h5>
              <FaThumbtack />
            </div>

            <div className="news-preview-containe-text">
            <hr />
              <h3 className="news-preview-title">{props.title}</h3>
              <p className="news-preview-text">{props.text}</p>
            <hr className='lasthr'/>
        </div>

        <div className="news-preview-icons"> 
              <div className='news-preview-statistics'>
                <button><FaEye /> 109</button>
                <button><FaComments /> 9</button>
                <button><FaThumbsUp /> 29</button>
                <button><FaShareAlt /> </button>
              </div>
              <h5 className='news-preview-readmore'>
                <NavLink to="/">Läs mer</NavLink>
              </h5>
            </div>
        </div>
      </div>
    )
  }

  return (
		<div className={`home`}>
			<div className='left'>
				<SideWidget icon={<FaMusic />} title='Pop musik - Artister'>
					<div className='spotify-api-content'>
						<p>
							<h5>Populärt just nu:</h5>
							<NavLink>
								<h5>Visa alla</h5>
							</NavLink>
						</p>
						<iframe
							src='https://open.spotify.com/embed/artist/1Xyo4u8uXC1ZmMpatF05PJ?utm_source=generator&theme=0'
							width='100%'
							height='152'
							frameBorder='0'
							allowfullscreen=''
							allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
							loading='lazy'></iframe>
						<iframe
							src='https://open.spotify.com/embed/artist/3TVXtAsR1Inumwj472S9r4?utm_source=generator'
							width='100%'
							height='152'
							frameBorder='0'
							allowfullscreen=''
							allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
							loading='lazy'></iframe>
					</div>
				</SideWidget>

				<SideWidget icon={<FaFileAudio />} title='Pop musik - Album'>
            <div className='spotify-api-content'>
              <p>
                <h5>Populärt just nu:</h5>
                <NavLink>
                  <h5>Visa alla</h5>
                </NavLink>
              </p>
              <iframe
                src='https://open.spotify.com/embed/album/6d1vGZsr6Uy3h9IigBpPAf?utm_source=generator&theme=0'
                width='100%'
                height='152'
                frameBorder='0'
                allowfullscreen=''
                allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                loading='lazy'></iframe>
              <iframe
                src='https://open.spotify.com/embed/album/7EpUpNUkkEGnaCvkcn1j4H?utm_source=generator'
                width='100%'
                height='152'
                frameBorder='0'
                allowfullscreen=''
                allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                loading='lazy'></iframe>
            </div>
				</SideWidget>
			</div>
			<div className='center'>
				{/* <GlobalChat user={contextValue.user} /> */}

				<div className='welcome-container'>
					<img className='welcome-img' src={Muscilogo} />
					<div className='welcome-text-container'>
						{contextValue.user ? (
							<h3>
								Välkommen åter
								<p>{contextValue.user.username}</p>
							</h3>
						) : (
							<h2>Välkommen till Mag Music</h2>
						)}
					</div>
					<hr />
					<div className='updates'>
						<div className='update-title'>
							<h5>Mag Music Forum (Pop Musik)</h5>
							<NavLink to='/' className={"showAllUpdates"}>
								<h5>Läs mer</h5>
							</NavLink>
						</div>
						<div className='news-list'>
            Popmusik är en genre som har fängslat publik över hela världen med sina medryckande melodier, livliga rytmer och lättillgängliga texter. Den uppstod under mitten av 1900-talet och har sedan dess blivit en dominerande kraft inom musikvärlden. Popmusik kännetecknas ofta av sina smittande refränger och dansanta beats, vilket gör den till en perfekt kompanjon på vilken hemsida som helst. Oavsett om du vill lyfta stämningen, sprida glädje eller bara njuta av en lättlyssnad melodi, kommer popmusiken alltid att vara där för att förgylla din dag.





							{/* {
                statusMsgArray.map(newsMsg => {
                  return(
                    <NewsPreview title={newsMsg.title} text={newsMsg.text} creator={newsMsg.creator} img={!!newsMsg.img} />
                    )
                  })
              } */}
						</div>
					</div>
					<hr />
					<div className='button'>
						<NavLink to={"/forum"}>
              <FaComments />
              Forum
						</NavLink>
            <NavLink to="/members">
              <FaUserAstronaut />
              Medlemmar
            </NavLink>
            <NavLink to="/members">
              <FaUserAlt />
              Din profil
            </NavLink>
						<Modal
							modalClass='shareMagForum'
							activeClass='shareBtnActive'
							btnClass='welcome-share-button'
							buttonClose={true}
							btnLabel={
								<>
									<FaShareAlt /> Dela Mag Music
								</>
							}>
							<ShareModal title={"Dela Mag Media"} />
						</Modal>
					</div>
				</div>
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
					{statistics && (
						<div className='statistic-contianer'>
							<div className='statistic-box'>
								<h5 className='title'>Medlemmar</h5>
								<h4>{statistics.userCount}</h4>
							</div>
							<div className='statistic-box'>
								<h5 className='title'>Senaste medlemmen</h5>
								<NavLink
									className='newest-user'
									to={`members/user/${statistics.newestUser}`}>
									<h4>{statistics.newestUser}</h4>
								</NavLink>
							</div>
							<div className='statistic-box'>
								<h5 className='title'>Återkommande besök</h5>
								<h4>{statistics.visitors.countRecurent}</h4>
							</div>
							<div className='statistic-box'>
								<h5 className='title'>Unika besök</h5>
								<h4>{statistics.visitors.countUnique}</h4>
							</div>
						</div>
					)}
				</SideWidget>
			</div>
		</div>
	);};