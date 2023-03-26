import './css/404.css'
import {FaArrowRight} from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import Navbar from './Navbar';

function PageNotFound() {
    document.title = "Fel | Mag Forum";

    return(
        <>
        <div className="pageNotFound">
            <h1>404</h1>
            <h2>Den här sidan är inte tillgänglig</h2>
            <NavLink className='goBack' to="/">Gå till Startsida</NavLink>
        </div>
    </>
    )
}

export default PageNotFound;