import React, { useEffect, useState } from 'react'
import { FaCircle, FaEdit, FaExclamationTriangle, FaFileImage, FaImage, FaOpencart, FaScrewdriver, FaServer, FaUserCog, FaUserPlus, FaUserSlash } from 'react-icons/fa';
import { NavLink, useLocation, useParams} from 'react-router-dom'
import { GetUser } from '../api/user';
import ServerError from '../components/ServerError';
import Tooltip from '../components/Tooltip';
import './css/User.css'
import Utils from '../assets/functiions/Utils';
import { checkAuthLevel } from '../assets/functiions/Auth';
import axios from 'axios';

import defaultAvatar from '../assets/avatarDefault.png'

export default function User() {
    const params = useParams()
    const usernameByParam = params.id;

    const [noUserFound, setNoUserFound] = useState(false);
    const [serverError, setServerError] = useState(false)
    const [user, setUser] = useState(false);
    const [ownerWhoVisit, setOwnerWhoVisit] = useState(false);
    const [activeTab, setActiveTab] = useState("about");
    const [isLoading, setIsLoading] = useState(true);
    const [postImage, setPostImage] = useState({base64: ""})

    const [userProfileHasChanged, setUserProfileHasChanged] = useState(false);
    const [userProfileEditPfp, setuUerProfileEditPfp] = useState(false);

    // Fixa till denna filen och flytta om diverse



    var userVisitng = {}

    useEffect(() => {
        GetUser(usernameByParam).then(res => {
            setUser(res.data)
            console.log(res.data)
            setIsLoading(false)
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
                <h4>Användaren <p className='noUserFoundSearchedName'>{usernameByParam}</p> hittades inte!</h4>
                <NavLink className='goBack' to="/">Gå till Startsida</NavLink>
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
                    {/* <img src={user.pfp.img} className='userProfile-pfp-img' alt="pfp" /> */}
                    {/*  */}

                    <div class="profile-pic">
                    <label class="-label" for="file">
                        <span class="glyphicon glyphicon-camera"></span>
                        <span>Change Image</span>
                    </label>
                    <input id="file" type="file" onchange="loadFile(event)"/>
                    
                    {/* Not required but if table images isnt avalibe when this condition will run! */}
                    {
                        user.pfp ? 
                        <img src={userProfileHasChanged ? postImage.base64 : user.pfp.img || "#"} id="output" width="200" />
                        :
                        // If database images is empy
                        <img src={userProfileEditPfp ? postImage.base64 : defaultAvatar}></img>
                    }
                    </div>
                     
                    {/*  */}
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
                </div>
            </div>
        )
    }

  return (
    <>
    <div className='userContainer'>
      {
        noUserFound ? <NoUserFound /> : (isLoading ? <p>Laddar</p> : <UserProfile />)
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
    return test
}