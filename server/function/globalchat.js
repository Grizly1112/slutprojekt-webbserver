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
    const {userId, messageText, img} = req.body;
    var imgOfMessage;
    try{
        console.log(img);
        console.log(userId)
        if(userId) {

            if(img) {
                imgOfMessage = await Image.create({
                    img: img
            })
            GlobalChatModel.create({
                text: messageText || "",
                    creator: userId,
                    img: imgOfMessage._id || null,
                })
            } else if(messageText) {
                GlobalChatModel.create({
                    text: messageText,
                    creator: userId,
                })
            }
        }
        // Un kommentera
    } catch(err) {
        throw err;
    }
}

export const globalChatMessageGet = async(req, res) => {
    try {
        const messageArray = await GlobalChatModel.find().populate('creator').populate('img');

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