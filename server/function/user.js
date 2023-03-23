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

        const regionNamesInEnglish = new Intl.DisplayNames(['sv'], { type: 'region' });
        
        user.country = regionNamesInEnglish.of(userIp.data.country_code);
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
    let usernameByParam = req.params.id;
    // console.log(usernameByParam)
    
    // SE ÖVER VAD SOM SKICAKS - SKIACKA INTE MED ALL DATA "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    try {
        let userData = await UserModel.findOne({ username: new RegExp(`^${usernameByParam}`, 'i') }).populate('pfp', 'img');
        // console.log(userData)

        if (!userData) return res.status(404).send({ message: "Avnändaren finns inte" })

        return res.status(200).send(userData)
    } catch (error) {
        return res.status(500).send({ message: "Serverfel uppstod"})
    }
}


// export const uploadPfp = async(req, res) => {
//     const userId = req.body.userId;
//     console.log(userId)
//     console.log("Files: ?")
//     console.log(req.files)
//     console.log("_____")

//     console.log(req.body)

//     var userPrf = "";

    
//     if (req.files) {
        
//         const promises = req.files.map(async image => {
//             try {
                
//                 const imgId = (await Image.create({ 
//                         data: image.buffer, 
//                         contentType: image.mimetype
//                     }))._id
                    
//                 return imgId
//             } catch (error) {
//                 console.error(error)
//                 return
//             }
//         });

//         userPrf = await Promise.all(promises)
//     }
//     try {
//         const user = await UserModel.findById(userId);
//         // console.log(user)
//         // console.log(userPrf)

//         user.pfp = userPrf._id;
//         await user.save();
//         let updatedPfp = await Image.findById(userPrf)

//         res.status(200).json(updatedPfp)
//     } catch(err) {
//         console.log(err);
//         return res.status(500).send({ message: "Serverfel uppstod"})
//     }
// }

export const uploadPfp = async(req, res) => {
        const userId = req.body.userId;
        console.log(userId)
        console.log("Files: ?")
        console.log(req.files)
        console.log("_____")
    
        console.log(req.body)
    
        var userPrf = "";
        
        try {
            const user = await UserModel.findById(userId);
            

            const previousPfp = await Image.findById(user.pfp);
            
            // Få detta att funka (ta bort förra profilbilden)
            // if(previousPfp && user.pfp !== "641cdbcb51dc7ad3744fdfc9") await Image.deleteOne({"_id": user.pfp}) 
            
            if (req.files) {
                const promises = req.files.map(async image => {
                    try {
                        const imgId = (await Image.create({ 
                                data: image.buffer, 
                                contentType: image.mimetype
                            }))._id
                            
                        return imgId
                    } catch (error) {
                        console.error(error)
                        return
                    }
                });
                userPrf = await Promise.all(promises)
            
                user.pfp = userPrf._id;
                await user.save();

                // Kanske itne behövs får se
                let updatedPfp = await Image.findById(userPrf)
                res.status(200).json(updatedPfp)

            }
        } catch(err) {
            console.log(err);
            return res.status(500).send({ message: "Serverfel uppstod"})
        }
       
    }