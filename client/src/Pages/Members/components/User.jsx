import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaBars, FaCircle, FaEdit, FaExclamationTriangle, FaFileImage, FaImage, FaInbox, FaInfo, FaInfoCircle, FaMailBulk, FaOpencart, FaQuestionCircle, FaRecycle, FaScrewdriver, FaServer, FaSpinner, FaUpload, FaUserCog, FaUserEdit, FaUserFriends, FaUserPlus, FaUserSlash } from 'react-icons/fa';
import { NavLink, Outlet, useParams} from 'react-router-dom'
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
import Tooltip from '../../../components/assets/Tooltip';

export default function User() {
    const [params, setparams] = useState(useParams());
    const socket = useRef(null);
    
    const [noUserFound, setNoUserFound] = useState(false);
    const [serverError, setServerError] = useState(false)
    const [user, setUser] = useState(false);
    const [ownerWhoVisit, setOwnerWhoVisit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [postImage, setPostImage] = useState({base64: ""})

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
                        var userOnline = false;
    
                        users.map((onlineUser) => {
                            if(onlineUser.userId === res.data.username) {
                                userOnline =true;
                            } 
                        })
                        setUser({...res.data, userOnline: userOnline})
                    });
                
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
        const base64 = await Utils.ConvertToBase64(file);
        setPostImage({...postImage, base64: base64})
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
                <div className={"userProfile"}>
                    <div className='userProfileHeader'>
                        <div className='userProfileHeaderContainer'>
                            <div className='banner'>
                                <div className='urserInformation'>
                                    <div class='profile-pic'>
                                        <img
                                            src={
                                                (user.pfp &&
                                                    "data:image/png;base64," + user.pfp.data) ||
                                                defaultAvatar
                                            }
                                        />
                                        <div 
                                            className={
                                                user.userOnline
                                                    ? "onlinestatus online"
                                                    : "onlinestatus"
                                            }>
                                        </div>
                                    </div>

                                    <div className='userDetailsContainer'>
                                        <div className='username'>
                                            <h2>{user.username}</h2>
                                            {user.staff && (
                                                <div className='staffBadge'>Moderator</div>
                                            )}
                                        </div>
                                        <div className='userDetails'>
                                            <div className='userDetails-box'>
                                                <h5>Vänner</h5>
                                                <h4>2</h4>
                                            </div>

                                            <div className='userDetails-box'>
                                                <h5>Gick med</h5>
                                                <h4>{Utils.FormatTimeDate(user.dateJoined)}</h4>
                                            </div>
                                            <div className='userDetails-box'>
                                                <h5>Från</h5>
                                                <h4>
                                                    {user.country} - {user.region}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='handleUserButtonsContianer'>
                                    {ownerWhoVisit ? (
                                        <div className='buttonEditUserProfile'>
                                            <Modal
                                                openState={true}
                                                modalClass='editUserModal'
                                                btnLabel={" Redigera profil"}
                                                buttonClose={true}
                                            >
                                                <div className='editUserModal'>
                                                    <div className='edituserModal-header'>
                                                        <h2>Ändra profil</h2>
                                                    </div>
                                                    <hr />
                                                    <div className='userEditUserDetails'>
                                                        <div className='editpdp'>
                                                            <img
                                                                src={
                                                                    (user.pfp &&
                                                                        "data:image/png;base64," +
                                                                            user.pfp.data) ||
                                                                    defaultAvatar
                                                                }
                                                                alt=''
                                                            />
                                                            <div className='buttons'>
                                                                <label className='editProfilePicture'>
                                                                    Ändra profilbild
                                                                    <input
                                                                        type='file'
                                                                        name='base64'
                                                                        id='file-upload'
                                                                        accept='.jpeg, .png, .jpg'
                                                                        onChange={async (e) => {
                                                                            await hanldeFileUpload(e);
                                                                            setUserProfileHasChanged(true);
                                                                            setuUerProfileEditPfp(true);
                                                                        }}
                                                                    />
                                                                </label>
                                                                <button disabled={true}>Spara</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='buttons'>
                                                        <button>Avbryt</button>
                                                        <button disabled={true}>Spara profil</button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </div>
                                    ) : (
                                        <div className='buttonEditUserProfile report'>
                                            <FaExclamationTriangle />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <ul>
                            <NavLink
                                className={"navbarModalNavLink"}
                                to={`/members/user/${user.username}`}
                                end>
                                <NavbarModalitem
                                    iconleft={<FaMailBulk />}
                                    label={"Profil inlägg"}
                                    iconRight={null}
                                />
                            </NavLink>
                            <NavLink
                                className={"navbarModalNavLink"}
                                to={`/members/user/${user.username}/friends`}>
                                <NavbarModalitem
                                    iconleft={<FaUserFriends />}
                                    label={"Vänner"}
                                    iconRight={null}
                                />
                            </NavLink>
                            <NavLink
                                className={"navbarModalNavLink"}
                                to={`/members/user/${user.username}/about`}>
                                <NavbarModalitem
                                    iconleft={<FaInfoCircle />}
                                    label={`Om ${user.username}`}
                                    iconRight={null}
                                />
                            </NavLink>
                        </ul>
                    </div>
                </div>
                <div className='userContent'>
                    <Outlet user={user} />
                </div>
            </>
        );
    }

  return (
    <div className='userContainer'>
      {
        noUserFound ? <NoUserFound /> : (isLoading ? <Loader />: <UserProfile />)
      }
      {
        serverError && <ServerError />
      }
    </div>
  );
}
