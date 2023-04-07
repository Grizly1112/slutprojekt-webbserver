import axios from "axios";
import { URL } from "./axios";

export const SendGlobalChatMessage = async (messageData) => await axios.post(`${URL}/globalchat/send`, messageData);

export const GetGlobalChatMessages = async () => await axios.get(`${URL}/globalchat/get`);