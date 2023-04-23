import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaBars, FaCircle, FaEdit, FaExclamationTriangle, FaFileImage, FaImage, FaInbox, FaInfo, FaInfoCircle, FaMailBulk, FaOpencart, FaQuestionCircle, FaRecycle, FaScrewdriver, FaServer, FaSpinner, FaUpload, FaUserCog, FaUserEdit, FaUserFriends, FaUserPlus, FaUserSlash } from 'react-icons/fa';
import { NavLink, Outlet, useLocation, useParams} from 'react-router-dom'
import { GetUser } from '../../../api/user';
import ServerError from '../../../components/ServerError';
import '../css/User.css'
import Utils from '../../../assets/functiions/Utils';
import axios from 'axios';

import defaultAvatar from '../../../assets/avatarDefault.png'
import {Loader} from '../../../components/assets/Loader';
import { io } from 'socket.io-client';
import { userContext } from '../../../context/UserContext';
import Modal from '../../../components/assets/Modal';

export default function User() {
    const [params, setparams] = useState(useParams());
    const socket = useRef(null);
    
    const [noUserFound, setNoUserFound] = useState(false);
    const [serverError, setServerError] = useState(false)
    const [user, setUser] = useState(false);
    const [ownerWhoVisit, setOwnerWhoVisit] = useState(false);
    const [activeTab, setActiveTab] = useState("profileMsg");
    const [isLoading, setIsLoading] = useState(true);
    const [postImage, setPostImage] = useState({base64: ""})

    const [userProfileHasChanged, setUserProfileHasChanged] = useState(false);
    const [userProfileEditPfp, setuUerProfileEditPfp] = useState(false);
    const [onlineUsers, setonlineUsers] = useState([]);
    const [hasLoadedInOnce,setHasLoadedInOnce] = useState(false)
    
    document.title = `Mag Media | ${user.username}`
        const contextValue = useContext(userContext);

        useEffect(() => {
            socket.current = io("ws://localhost:3001");

            GetUser(params.id).then((res) => {

                    if(contextValue.user) {
                        socket.current.emit("new-user-add", {username: contextValue.user.username, pfp: contextValue.user.pfp && contextValue.user.pfp.img ? contextValue.user.pfp.img : ""});
    
                        if(res.data.username === contextValue.user.username) {
                            setOwnerWhoVisit(true)
                        }
                    } else {
                        socket.current.emit("new-user-add", (""));
                    }
                    socket.current.on("get-users", (users) => {
                        setonlineUsers(users);
                        var userOnline = false;
    
                        users.map((onlineUser) => {
                            if(onlineUser.userId === res.data.username) {
                                userOnline =true;
                            } 
                        })
                        setUser({...res.data, userOnline: userOnline})
                    });
                
                setIsLoading(false)
                setTimeout(() => setHasLoadedInOnce(true), 1500)
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
        
            return () => {
            socket.current.disconnect();
            }
        },[contextValue, params.id]) 
    
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        createPost(postImage)
        setuUerProfileEditPfp(false)
        // Kanske kan lösa
        // Påmilese: läs på om detta !!
        // https://stackoverflow.com/questions/73256804/how-to-update-user-image-across-all-components-without-page-refresh
        //  och usesession https://next-auth.js.org/getting-started/client
        location.reload();

    }

    const createPost = async (newProfilePicture) => {
        try {
            console.log(userVisitng)
            await axios.post("http://localhost:8000/user/updateprofilepicture", {newProfilePicture, userId: userVisitng._id})
        } catch(error) {
            console.log(error)
        }
    }


    const hanldeFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({...postImage, base64: base64})
        console.log(postImage)
    }

    const NoUserFound = () => {
        return(
            <div className='noUserFound'>
                <FaUserSlash className='icon' />
                <h4>Användaren <p className='noUserFoundSearchedName'>{params.id}</p> hittades inte!</h4>
                <NavLink className='goBack' to="/">Gå till Startsida</NavLink>
            </div>
        )
    }
    
    const NavbarModalitem = (props) => {
        return(
        <div className='navbarModal-item' onClick={() => props.func ? props.func(): null}>
            <i className="navbarModal-item-icon-left">{props.iconleft}</i>
            <h4 className='navbarModal-label'>{props.label}</h4>
            <i className="navbarModal-item-icon-right">{props.iconRight}</i>
        </div>
        )
    }

    const UserProfile = () => {
        const UserAbout = () => {
            return(<div>Om mig</div>)
        }

        const UserFriends = () => {
            return(<div>Vänlista</div>)
        }

        return(
            <>
            <div className={hasLoadedInOnce ? 'userProfile ': "userProfile hasLoadedInOnce"}>
                <div className="userProfileHeader">
                    <div className="userProfileHeaderContainer">
                        <div className="banner">
                            <div className='urserInformation'>
                                <div class="profile-pic">
                                <img src={user.pfp && ('data:image/png;base64,' + user.pfp.data) || defaultAvatar} />
                                    
                                </div>

                                <div className='userDetailsContainer'>
                                    <div className='username'>
                                        <h2>
                                            {user.username} 
                                        </h2>
                                        {
                                            user.staff &&
                                            <div className='staffBadge'>Moderator</div> 
                                        }
                                        <FaCircle className='circleDot' />
                                        <h2>
                                        {Utils.FormatUserAge(user.dateOfBirth)} år
                                        </h2>
                                    </div>
                                    <div className="userDetails">
                                        <h4><p>Från:</p>{user.country} - {user.region}</h4>
                                        <h4><p>Gick med:</p>{Utils.FormatTimeDate(user.dateJoined)}</h4>
                                        <h4><p>Status:</p>{user.userOnline ? `Online`: "Offline"}</h4>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="handleUserButtonsContianer">
                                {
                                    ownerWhoVisit? 
                                    <div className="buttonEditUserProfile">
                                        <Modal btnLabel={<p><FaUserEdit /> Redigera profil</p>}>
                                            <div className='editUserModal'>Mag</div>

                                        </Modal>
                                    </div>
                                    :
                                    <div className="buttonEditUserProfile report">
                                        <FaExclamationTriangle /> 
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                   <ul>
                        <NavLink className={"navbarModalNavLink"} to={`/members/user/${user.username}`} end>
                            <NavbarModalitem iconleft={<FaMailBulk />} label={"Profil inlägg"}iconRight={null}/>
                        </NavLink>
                        <NavLink className={"navbarModalNavLink"} to={`/members/user/${user.username}/friends`}>
                            <NavbarModalitem iconleft={<FaUserFriends />} label={"Vänner"}iconRight={null}/>
                        </NavLink>
                        <NavLink className={"navbarModalNavLink"} to={`/members/user/${user.username}/about`}>
                            <NavbarModalitem iconleft={<FaInfoCircle />} label={`Om ${user.username}`}iconRight={null}/>
                        </NavLink>
                   </ul>
                </div>
            </div>
            <div className="userContent">
                <Outlet user={user} />
            </div>
        </>
        )
    }
    {/* <div className='userProfile-header'>
        <div className='userProfile-pfp-div'>
            <div class="profile-pic">
            {
                user.pfp ? 
                <img src={userProfileHasChanged ? postImage.base64 : user.pfp.img || "#"} id="output" width="200" />
                :
                <img src={userProfileEditPfp ? postImage.base64 : defaultAvatar}></img>
            }
            </div>
            
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
   {
        ownerWhoVisit ? 
        <>
        <form onSubmit={handleSubmit}>
            {
                userProfileEditPfp ? 
                <>
                <label className='editProfilePicture savepfpEdits'>
                  <FaEdit /> Spara profilbild
                 <input type="submit" value="spara" />
                </label>
                <label className='editProfilePicture deleteEdits' onClick={() => {setUserProfileHasChanged(false); setuUerProfileEditPfp(false)}}>
                  <FaEdit /> Avbryt
                </label>
                </>
                :
            <label className='editProfilePicture'>
                    <FaEdit /> Ändra profilbild
                    <input type="file" name="base64" id="file-upload" accept='.jpeg, .png, .jpg' 
                     onChange={async(e) => { await hanldeFileUpload(e);  setUserProfileHasChanged(true);setuUerProfileEditPfp(true) }}
                     />
            </label>
       
                    }
        </form>
        </>
        : null
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
    </div> */}

  return (
    <>
    <div className='userContainer'>
      {
        noUserFound ? <NoUserFound /> : (isLoading ? <Loader />: <UserProfile />)
      }
      {
        serverError ? <ServerError /> : null
      }
    </div>
   
    </>
  );
}

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}