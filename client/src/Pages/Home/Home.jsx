import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FaArrowCircleRight, FaChartBar, FaChevronCircleRight, FaChevronRight, FaCloud, FaCloudMoon, FaCloudRain, FaCloudShowersHeavy, FaCloudSun, FaCommentAlt, FaComments, FaCompass, FaExpandAlt, FaExpandArrowsAlt, FaEye, FaGlobeEurope, FaImage, FaInfoCircle, FaMapMarkedAlt, FaMinusCircle, FaMoon, FaRegFlag, FaRegNewspaper, FaRegWindowClose, FaRegWindowMinimize, FaSearch, FaShare, FaShareAlt, FaShareAltSquare, FaSnowflake, FaSun, FaTemperatureHigh, FaThumbsUp, FaThumbtack, FaUsers, FaWind } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import './css/Home.css'
import userDefault from '../../assets/avatarDefault.png'
import Tooltip from '../../components/assets/Tooltip'
import { io } from "socket.io-client";
import { userContext } from '../../context/UserContext'
import GlobalChat from './GlobalChat'
import logo from '../../assets/logo.png'
import Modal from '../../components/assets/Modal'
import Clock from './Clock'
import Utils from '../../assets/functiions/Utils'
import { GetVisitingCount, GetWeatherData } from '../../api/other'
export default function Home() {
  document.title ="Mag Forum | Startskärm"

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
        if (userOnline.userId === "") {
          count.guests++;
        } else if (userOnline.userId.startsWith("guest-")) {
          count.guests++;
        } else {
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

    // Funktion to filter out guests from onlineUSerList
    const onlineUsersList = React.useMemo(() =>
    onlineUsers.filter(userOnline => !userOnline.userId.startsWith("guest-") && userOnline.userId !== ""),
    [onlineUsers]
     );
    const renderOnlineUser = React.useCallback((userOnline) => {
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
        setStatistics(res.data);
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

  const linkRef = useRef(null);
  if (linkRef.current) {
    navigator.clipboard.writeText(linkRef.current.innerText);
  }
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

  function copyToClipboard() {
    if (linkRef.current) {
      navigator.clipboard.writeText(linkRef.current.innerText);
      alert("Url Koperad")
    }
  }

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
      // <div className="news-preview">
      //   <div className="creator">
      //     <img src={props.creator.pfp} alt="pfp" />
      //     <h5>{props.creator.username}</h5>
      //   </div>
      //   <div className='news-content'>
      //     <div className="news-content-text">
      //       <h4 className="news-content-title">{props.title}</h4>
      //       <h5 className="news-content-tetx">{props.text}</h5>
      //     </div>
      //     <div className="news-preview-statistic">
      //       <FaRegFlag />
      //       <FaShareAlt />
      //       {/* <FaThumbsUp /> */}
      //       {
      //         props.img && 
      //         <FaImage />
      //       }
      //     </div>
      //   </div>
      // </div>
      <div className="news-preivew">
        <div className="creator-pfp">
          <img src={props.creator.pfp} />
        </div>
        
        <div className="news-preview-container">
        
            <div className="news-creator-title">
              <h4 className='news-creator-username'>Grizly</h4>
              <div className="staffBadge">Moderator</div> 
              <h5 className='news-creator-timestand'>12/4/2023 15:09</h5>
              <FaThumbtack />
            </div>

            <div className="news-preview-containe-text">
            <hr />
              <h2 className="news-preview-title">{props.title}</h2>
              <p className="news-preview-text">{props.text}</p>
            <hr className='lasthr'/>
        </div>

        <div className="news-preview-icons"> 
              <div className='news-preview-statistics'>
                <button><FaEye /> 109</button>
                <button><FaComments /> 9</button>
                <button><FaThumbsUp /> 29</button>
              </div>
              <h5>
                <NavLink to="/">Läs mer</NavLink>
              </h5>
            </div>
        </div>

      </div>
    )
  }

  return (
    <div className={`home`}>
      <div className='left'></div>
      <div className='center'>
        {/* <GlobalChat user={contextValue.user} /> */}
        
        <div className="welcome-container">
          <img className='welcome-img' src={logo} />
          <div className='welcome-text-container'>
              {contextValue.user ? 
               <h3>
                Välkommen åter 
                <p>
                  {contextValue.user.username}
                </p>
              </h3>
              :
              <h2>
                 Välkommen till Mag Media
              </h2>
              }
            {/* {
              !contextValue.user  ?
              <p>
              Välkommen till Mag Media! Det här är en plattform där du kan chatta med människor från hela världen och dela dina tankar, idéer och erfarenheter. Vi är glada att du har valt att vara en del av vår community.
              <br /><br/> Vi vill påminna dig om att åldersgränsen för att delta på Mag Media är 18 år. Detta beslutades för att säkerställa en trygg och säker miljö för alla våra användare. Vi värdesätter integritet och respekt för varandra, och vi tror att denna åldersgräns hjälper till att upprätthålla detta.
              <br /> <br />Tack för att du har valt Mag Media som din nya chattdestination!
              </p>
              : 
              <p>
                Som inloggad användare har du nu tillgång till alla våra funktioner och verktyg för att chatta och kommunicera med andra användare. Vi uppmuntrar dig att använda vår plattform på ett positivt sätt genom att dela dina idéer, erfarenheter och kunskap.
                Tack för att du återvänder till Mag Media och vi ser fram emot att se vad du har att bidra med i vår community!
              </p>
            } */}
          </div>
          <hr />
          <div className="updates">
            <div className="update-title">
              <h5>Senaste Nyheterna</h5>
              <NavLink to="/" className={"showAllUpdates"}><h5>Visa alla</h5></NavLink>
            </div>
            <div className="news-list">
              {
                statusMsgArray.map(newsMsg => {
                  return(
                    <NewsPreview title={newsMsg.title} text={newsMsg.text} creator={newsMsg.creator} img={!!newsMsg.img} />
                    )
                  })
              }
            </div>

          </div>
          <hr/>
          <div className='button'>
            <NavLink to={!contextValue.user ? "/register" : "/members</div>"}>{!contextValue.user ? "Skapa Konto" : <> <FaComments />Börja Chatta</>}</NavLink>
            <Modal modalClass="shareMagForum" activeClass="shareBtnActive" btnClass="welcome-share-button" buttonClose={true} btnLabel={<><FaShareAlt /> Dela Mag Media</>}>
              <div className='shareMagForum'>
                <div className="share-header">
                  <h2>Dela - Mag Media</h2>
                </div>
                  <hr />
                  {/* ändra alla länkar.com till URL */}
                  <div className='social-media-share'>

                  {/* https://stackoverflow.com/questions/6208363/sharing-a-url-with-a-query-string-on-twitter */}
                  <Tooltip label={"Dela på Facebook"}>
                  <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmagmedia.se" target="_blank" rel="noopener">
                      <img class="YOUR_FB_CSS_STYLING_CLASS" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" width="34px" height="34px" alt="Share on Facebook" />
                  </a>
                  </Tooltip>
                  <Tooltip label={"Dela på Twitter"}>
                  <a href="http://www.twitter.com/share?url=http://www.google.com/" target="_blank" rel="noopener">
                    <img class="YOUR_FB_CSS_STYLING_CLASS" src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-twitter-social-media-round-icon-png-image_6315985.png" width="34px" height="34px" alt="Share on Facebook" />
                  </a>
                  </Tooltip>
                  <Tooltip label={"Dela på Reddit"}>
                    <a href='http://www.reddit.com/submit?url=https://stackoverflow.com/questions/24823114/post-to-reddit-via-url&title=Post%20to%20Reddit%20via%20URL'>
                      <img class="YOUR_FB_CSS_STYLING_CLASS" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Reddit_icon.svg/800px-Reddit_icon.svg.png" width="34px" height="34px" alt="Share on Facebook" />
                    </a>
                  </Tooltip>
                  </div>

                  <div className="url">
                    <div className="link"  ref={linkRef}>{window.location.href}</div>
                    <button onClick={(copyToClipboard)}>kopiera</button>
                </div>
              </div>
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
                <NavLink className="newest-user" to={`members/user/${statistics.newestUser}`}>
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