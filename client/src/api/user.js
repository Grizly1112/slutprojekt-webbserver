import axiosInstance from './axiosInstance';

export const RegisterUserServerPost = async (userData) => await axiosInstance.post(`/user/register`, userData)

export const LoginUserServerPost = async (userData) => await axiosInstance.post(`/user/login`, userData)

export const GetUser = async (username) => await axiosInstance.get(`/user/getuser/${username}`)

export const SetUserLastSeen = async (username) => await axiosInstance.get(`/user/setuserlastseen/`, userData);

export const GetForumStatistics = async () => await axiosInstance.get(`/forum/getstatistics`);