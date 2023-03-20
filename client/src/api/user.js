import axios from 'axios';
import { URL } from './url';

export const RegisterUserServerPost = (userData) => {
    console.log(userData)
    axios.post(`${URL}/user/register`, userData)}
    ;
