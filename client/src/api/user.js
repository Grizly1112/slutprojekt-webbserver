import axios from 'axios';
import { URL } from './axios';

export const RegisterUserServerPost = async (userData) => await axios.post(`${URL}/user/register`, userData)

export const LoginUserServerPost = async (userData) => await axios.post(`${URL}/user/login`, userData)