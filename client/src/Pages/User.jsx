import React, { useEffect, useState } from 'react'
import { FaCircle, FaEdit, FaExclamationTriangle, FaOpencart, FaScrewdriver, FaServer, FaUserCog, FaUserPlus, FaUserSlash } from 'react-icons/fa';
import { NavLink, useLocation, useParams} from 'react-router-dom'
import { GetUser } from '../api/user';
import ServerError from '../components/ServerError';
import Tooltip from '../components/Tooltip';
import './css/User.css'
import Utils from '../assets/functiions/Utils';
import { checkAuthLevel } from '../assets/functiions/Auth';

export default function User() {
    const params = useParams()
    const usernameByParam = params.id;

    const [noUserFound, setNoUserFound] = useState(false);
    const [serverError, setServerError] = useState(false)
    const [user, setUser] = useState(false);
  const [ownerWhoVisit, setOwnerWhoVisit] = useState(false);


    useEffect(() => {
        GetUser(usernameByParam).then(res => {
            setUser(res.data)
            console.log(res.data)
        }).catch((err) => {
            try {

                if(err.response.status === 404) {
                    console.log("kunde inte hitta")
                    setNoUserFound(true)
                } else if(err.response.status === 500) {
                    setServerError(true);
                    console.log("Server error")
                }
            } catch(err) {
                setServerError(true)
            }
        });
    }, [])


    const NoUserFound = () => {
        return(
            <div className='noUserFound'>
                <FaUserSlash className='icon' />
                <h4>Användaren <p className='noUserFoundSearchedName'>{usernameByParam}</p> hittades inte!</h4>
                <NavLink className='goBack' to="/">Gå till Startsida</NavLink>
            </div>
        )
    }

    const [activeTab, setActiveTab] = useState("about");
  

    const UserProfile = () => {
        const UserAbout = () => {
            return(<div>Om mig</div>)
        }

        const UserFriends = () => {
            return(<div>Vänlista</div>)
        }

        
            var userVisitng = {}
            let userLoggedIn = false;

            if(
                localStorage.getItem('user') 
                && 
                checkAuthLevel(JSON.parse(localStorage.getItem('user')).token, 0)) {
                userLoggedIn = true;
                userVisitng = JSON.parse(localStorage.getItem('user')).userData
                console.log(userVisitng.username)

                if(userVisitng.username === user.username ) {
                    setOwnerWhoVisit(true)
                }
            } 


        return(
            <div className='userProfile'>
                <div className='userProfile-header'>
                <div className='userProfile-pfp-div'>
                    <img src="#" className='userProfile-pfp' alt="pfp" />
                </div>
                <div className="userProfile-header-information">
                    <div className='userProfile-username-div'>
                        <h2 className='userProfle-username'>
                            {user.username}
                        </h2>
                        <div>
                        <Tooltip label="Lägg till vän">  
                            <button className='userHandling-button'>
                                <FaUserPlus />
                            </button>
                        </Tooltip>
                        </div>
                    </div>
                    <div className="userDetails">
                      <h4>{Utils.FormatUserAge(user.dateOfBirth)} år gammal <FaCircle className='circle' /> {user.country} - {user.region}</h4>
                      <h4><p>Gick med:</p>{Utils.FormatTimeDate(user.dateJoined)}</h4>
                      <h4><p>Senast online:</p> 5 minuter sedan</h4>
                    </div>
                </div>
                </div>
                <div className="viewMore">
                {/* {
                // Fixa med token också
                    userViewing ? (userViewing.username === user.username ? <input type="file" accept='image/*' placeholder='Profilbild' /> : null) : null
                    
                } */}
                {
                    ownerWhoVisit ? <input type="file" accept='image/*' placeholder='Profilbild' /> : null
                }
                   <div className='select'>
                        <ul>
                            <li className={activeTab === "about" ? "select-active " : null} id='about' onClick={(e) => {
                                setActiveTab(e.target.id)
                            }}>Om {user.username} </li>
                            
                            <li className={activeTab === "friends" ? "select-active " : null} id='friends' onClick={(e) => {
                                    setActiveTab(e.target.id)
                            }}>Vänner (59) </li>
                             
                        </ul>
                        <hr />
                   </div>
                   
                   <div className="content">
                    {
                        activeTab === "about" ? <UserAbout /> : null
                    }
                    {
                        activeTab === "friends" ? <UserFriends /> : null
                    }
                   </div>
                </div>
            </div>
        )
    }

  return (
    <>
    <div className='userContainer'>
      {
        noUserFound ? <NoUserFound /> : <UserProfile />
      }
      {
        serverError ? <ServerError /> : null
      }
    </div>
    </>
  );
}