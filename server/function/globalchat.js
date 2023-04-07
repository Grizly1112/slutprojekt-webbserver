import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import axios from 'axios'
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

import UserModel from "../Models/user.js"
import Image from "../Models/image.js"
import GlobalChatModel from "../Models/globalchat.js"


dotenv.config()



export const globalChatMessageUpload = async(req, res) => {
    const {userId, messageText} = req.body;


    GlobalChatModel.create({
        text: messageText,
        creator: userId
    })
}

export const globalChatMessageGet = async(req, res) => {
    console.log("ejejeje")
    try {
        const messageArray = await GlobalChatModel.find().populate('creator');

        // promise för att fixa med await 
        await Promise.all(messageArray.map(async (msg, i) => {
            const creator = await UserModel.findById(msg.creator).populate('pfp', 'img');
            messageArray[i].creator = creator;
        }));

        return res.status(200).send({messageArray})

    } catch (err) {
        console.log(err);
        return res.status(500).send({message: "Serverfel uppstod"})
    }
}