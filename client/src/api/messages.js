import axios from "axios";

const URL = "http://localhost:8000"

export const SendGlobalChatMessage = async (messageData) => await axios.post(`${URL}/globalchat/send`, messageData);

export const GetGlobalChatMessages = async () => await axios.get(`${URL}/globalchat/get`);