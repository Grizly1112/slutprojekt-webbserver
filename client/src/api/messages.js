import axiosInstance from './axiosInstance';

export const SendGlobalChatMessage = async (messageData) => await axiosInstance.post(`/globalchat/send`, messageData);

export const GetGlobalChatMessages = async () => await axiosInstance.get("/globalchat/get");

