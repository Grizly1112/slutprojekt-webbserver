import axios from 'axios';
import { URL } from './axios';

export const RegisterUserServerPost = async (userData) => await axios.post(`${URL}/user/register`, userData)

export const LoginUserServerPost = async (userData) => await axios.post(`${URL}/user/login`, userData)

export const GetUser = async (username) => await axios.get(`${URL}/user/getuser/${username}`)

export const SetUserLastSeen = async (username) => await axios.get(`${URL}/user/setuserlastseen/`, userData);


export const GetForumStatistics = async () => await axios.get(`${URL}/forum/getstatistics`);