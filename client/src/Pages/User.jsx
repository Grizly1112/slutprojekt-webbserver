import React, { useEffect, useState } from 'react'
import { FaExclamationTriangle, FaScrewdriver, FaServer, FaUserSlash } from 'react-icons/fa';
import { NavLink, useLocation, useParams} from 'react-router-dom'
import { GetUser } from '../api/user';
import ServerError from '../components/ServerError';
import './css/User.css'

export default function User() {
    const params = useParams()
    const usernameByParam = params.id;

    const [noUserFound, setNoUserFound] = useState(false);
    const [serverError, setServerError] = useState(false)
    const [user, setUser] = useState(false);

     
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

    const UserProfile = () => {
        return(
            <div style={{marginTop: "20vh"}}>
                {user.username}
            </div>
        )
    }


  return (
    <>
    <div className='userContainer'>
      {/* <h2>{usernameByParam} Sköt</h2> */}
      {
        noUserFound ? <NoUserFound /> : <UserProfile />
      }
      {
        serverError ? <ServerError /> : null
      }
      

    </div>
    </>
  );
  
// }
// function Topic() {
//     let { topicId } = useParams();
//     return <h3>Requested topic ID: {topicId}</h3>;
  }