import React, { useContext, useEffect, useState } from 'react'
import { FaChessRook, FaChevronCircleRight, FaCog, FaCogs, FaCompass, FaHouseUser, FaRegUserCircle, FaUserAstronaut, FaUserCheck, FaUserCircle, FaUserFriends, FaUserPlus, FaUserTimes, FaUsers } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { userContext } from '../../../context/UserContext'
import Breadcrumbs from '../../../components/assets/Breadcrumbs'
import Tooltip from '../../../components/assets/Tooltip'

export default function MembersSideBar() {
const [user, setUser] = useState([])

document.title ="Mag Forum | Medlemmar"


const contextValue = useContext(userContext)
    useEffect(() => {
        if(contextValue.user) setUser(contextValue.user);
        console.log(user)
    }, [contextValue])


    const NavbarModalitem = (props) => {
        return(
        <div className='navbarModal-item' onClick={() => props.func ? props.func(): null}>
            <i className="navbarModal-item-icon-left">{props.iconleft}</i>
            <h4 className='navbarModal-label'>{props.label}</h4>
            <i className="navbarModal-item-icon-right">{props.iconRight}</i>
        </div>
        )
    }


    return (
        <div className='memberssideBar'>
            <h2>Medlemmar</h2>
            <ul>
            <NavLink className='navbarModalNavLink' to={`/members`} end>
                <NavbarModalitem iconleft={<FaCompass />} label={"Utforska"}iconRight={null}/>
            </NavLink>
            <NavLink className='navbarModalNavLink' to={`user/${user.username}`}>
                <NavbarModalitem iconleft={<FaUserCircle />} label={"Ditt konto"}iconRight={null}/>
            </NavLink>
            <NavLink className='navbarModalNavLink' to={`/asd`}>
                <NavbarModalitem iconleft={<FaUserFriends />} label={"Vänner"}iconRight={null}/>
            </NavLink>
            <NavLink className='navbarModalNavLink' to={`/asd`}>
                <NavbarModalitem iconleft={<FaUserCheck />} label={"Vänförfrågningar"}iconRight={null}/>
            </NavLink>
            <NavLink className='navbarModalNavLink' to={`/asd`}>
                <NavbarModalitem iconleft={<FaUserPlus />} label={"Lägg till vän"}iconRight={null}/>
            </NavLink>
            </ul>
            {/* Just empty */}
            <div></div>
        </div>
    )
}
