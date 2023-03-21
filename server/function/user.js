import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

import UserModel from "../Models/user.js"

dotenv.config()


export const register = async (req, res) => {
    const user = req.body;
    console.log("helö")
  
    // https://mongoosejs.com/docs/promises.html
    try {
        const hashedPassword = await bcrypt.hash(user.password, 12);

        const usernameTaken = await UserModel.findOne({username: new RegExp(`^${user.username}$`, 'i')})
        
        const emailTaken = await UserModel.findOne({email: new RegExp(`^${user.email}$`, 'i')})
        
        if(usernameTaken && emailTaken) return res.status(400).json({message: "Både email och användarnamn upptaget"})
        if(usernameTaken) return res.status(400).json({message: "Användarnamnet är upptaget"})
        if(emailTaken) return res.status(400).json({message: "Emailen är upptaget"})
        // Create user in mongoDb

        let userData = await UserModel.create({username: user.username, password: hashedPassword, email: user.email})
        userData.id = userData._id;

        const accessToken = jwt.sign(userData.toJSON(), process.env.JWT_ACCESS_TOKEN, {expiresIn: process.env.JWT_EXPIRES_IN})

        // Return sucess 
        return res.status(200).send({userData, accessToken})

    } catch (err) {
        console.log(err);
        return res.status(500).send({message: "Serverfel uppstod"})
    }
}

export const login = async (req, res) => {
    const user = req.body;
    
    try {
        var userData; 
        const logginByEmail = user.username.includes("@");

        if(logginByEmail) {
            userData = await UserModel.findOne({email: new RegExp(`^${user.email}`, 'i')})
        } else {
            userData = await UserModel.findOne({username: new RegExp(`^${user.username}`, 'i')})
        }

        if(!userData) return res.status(400).json({message: "Användaren finns inte"})
        
        const correctPassword = await bcrypt.compare(user.password, userData.password);

        if(!correctPassword) return res.status(400).json({message: "Inkorrekt lösenord"})

        const token = jwt.sign(userData.toJSON(), process.env.JWT_ACCESS_TOKEN, {expiresIn: process.env.JWT_EXPIRES_IN})

        return res.status(200).send({userData, token});

    } catch(err) {
        console.log(err);
        return res.status(500).send({message: "Serverfel uppstod"})
    }
}