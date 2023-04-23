import React, { useContext, useEffect, useState } from 'react'
import '../css/ProfilePost.css'
import FormInput from '../../../components/assets/FormInput'
import { FaRegPaperPlane, FaSeedling } from 'react-icons/fa'
import { userContext } from '../../../context/UserContext'
import userDefault from '../../../assets/avatarDefault.png'
import Tooltip from '../../../components/assets/Tooltip'
import { NavLink } from 'react-router-dom'

export default function ProfilePost(props) {
    const [userwhovisit, setUserWhoVisit] = useState([]);

    const contextValue = useContext(userContext);

    useEffect(() => {
        if(contextValue.user) setUserWhoVisit(contextValue.user);
    }, [contextValue])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try{
        //   const {data} = await LoginUserServerPost(values);
        //   await Auth(data);
    
        //   if(window.location.href.indexOf("login")) {
        //     navigate("/")
        //   }
        //   window.location.reload();
    
        // } catch(err) {
        //   console.log(err)
        //   setErrorMsg(err.response.data.message)
        // }
      };

      return (
        <>
        <div className='ProfilePost'>
        </div>
      <h1>Profilsida</h1>
            
        {/* {
    <div className='ProfilePost'>
            userwhovisit ?
        <>
        <form action="" onSubmit={handleSubmit}>
            <Tooltip label={`${userwhovisit.username}`}>
                <NavLink to={`/members/user/${userwhovisit.username}`}>
                <img src={userwhovisit.pfp ? userwhovisit.pfp.img : userDefault} className="onlineUsers-img" alt="" />
                </NavLink>
                </Tooltip>
                <input type="text" name="message" placeholder='Skriv något om Grizly'/>
                <button type='submit'>Skicka <FaRegPaperPlane /></button>
                </form>
                <hr />
                </>
                : null
                
                </div>
                </div>
            */}
            </>
  )
}