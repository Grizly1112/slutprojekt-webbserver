import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import axios from 'axios'
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

import UserModel from "../Models/user.js"
import Image from "../Models/image.js"


dotenv.config()


export const register = async (req, res) => {
    const user = req.body;
  
    // https://mongoosejs.com/docs/promises.html
    // Add that you cant have guest as a profile picture
    try {
        const hashedPassword = await bcrypt.hash(user.password, 12);

        const usernameTaken = await UserModel.findOne({username: new RegExp(`^${user.username}$`, 'i')})
        
        const emailTaken = await UserModel.findOne({email: new RegExp(`^${user.email}$`, 'i')})
        
        if(usernameTaken && emailTaken) return res.status(400).json({message: "Både email och användarnamn upptaget"})
        if(usernameTaken) return res.status(400).json({message: "Användarnamnet är upptaget"})
        if(emailTaken) return res.status(400).json({message: "Emailen är upptaget"})
       
        const userHasAgeRequired = (((Date.now() - new Date(user.birthday)) / (31557600000)) > 18);
        if(!userHasAgeRequired) return res.status(400).json({message: "Du måste vara 18+ för att gå med!"})

        // Create user in mongoDb
        const userIp = await axios.get('https://ipapi.co/json/');
        user.ip = userIp.data.ip

        const regionNamesInSwedish = new Intl.DisplayNames(['sv'], { type: 'region' });
        
        user.country = regionNamesInSwedish.of(userIp.data.country_code);
        user.region = userIp.data.region.split(" ")[0];

        console.log(user)

        let userData = await UserModel.create({username: user.username, password: hashedPassword, email: user.email, dateOfBirth: user.birthday,  ip: user.ip, country: user.country, region: user.region})
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
            console.log("ejeje")
            userData = await UserModel.findOne({email: new RegExp(`^${user.username}`, 'i')})
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

export const getuser = async (req, res) => {
    const usernameByParam = req.params.id;
  
    try {
      const userData = await UserModel.findOne({ username: new RegExp(`^${usernameByParam}`, 'i') }).populate('pfp', 'img');
      if (!userData) {
        return res.status(404).send({ message: "Användaren finns inte" });
      }
      return res.status(200).send(userData);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Serverfel uppstod" });
    }
  };


export const uploadProfilePicture = async (req, res) => {
    const { newProfilePicture, userId } = req.body;
  
    try {
        const user = await UserModel.findById(userId);
        const previousProfilePicture = await Image.findById(user.pfp);
    
      /* These two lines of code are creating a regular expression to extract the ID of the current
      profile picture from the user object. */
        const profilePictureIdRegex = /[^\s"]+|"([^"]*)"/gi;
        const currentProfilePictureId = profilePictureIdRegex.exec(user.pfp.toString())[0];

    
        if (previousProfilePicture !== null) {
            
            try {
            previousProfilePicture.img = newProfilePicture.base64;
            await previousProfilePicture.save();
    
            res.status(200).json({ msg: "Profil bilden uppdaterades " });

            } catch (err) {
            
                console.log(err);
            res.status(500).send("Failed to update profile picture");
            
            }
      
        } else {

            try {
            const createdProfilePicture = await Image.create({
                img: newProfilePicture.base64,
            });
            
            let userProfilePicture = createdProfilePicture._id;
            createdProfilePicture.save();
    
            let user = await UserModel.findById(userId);
            user.pfp = userProfilePicture;
            await user.save();
    
            res.status(201).json({ msg: "Ny profilbild tillagd" });
            
            } catch (err) {
            console.log(err);
            res.status(500).send("Fel uppstod");
            
            }
        
        }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Serverfel uppstod" });
    }
  };
