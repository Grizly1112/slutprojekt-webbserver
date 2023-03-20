import './css/404.css'
import {FaArrowRight} from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import Navbar from '../components/Navbar';

function PageNotFound() {
    document.title = "Fel | Mag Forum";

    return(
        <>
        <Navbar />
        <div className="pageNotFound">
            <h1>Den här sidan är inte tillgänglig</h1>
            <p>Det är möjligt att länken är trasig eller att sidan har tagits bort. Kontrollera att länken du försöker öppna är korrekt.</p>
            <NavLink className='goBack' to="/">Gå till Startsida</NavLink>
        </div>
    </>
    )
}

export default PageNotFound;