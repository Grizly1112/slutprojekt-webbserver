import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import axios from 'axios'
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

import UserModel from "../Models/user.js"
import Image from "../Models/image.js"
import VisitorModel from "../Models/countVisitors.js"
import mongoose from "mongoose"
import ProfilePostMessageModel from "../Models/ProfilePostMessage.js"
import PostModel from "../Models/post.js"
// import { mongoose } from "../index.js"


dotenv.config()


export const register = async (req, res) => {
    const user = req.body;

    try {
        const hashedPassword = await bcrypt.hash(user.password, 12);

        const usernameTaken = await UserModel.findOne({username: new RegExp(`^${user.username}$`, 'i')})
        
        const emailTaken = await UserModel.findOne({email: new RegExp(`^${user.email}$`, 'i')})
        
        if(usernameTaken && emailTaken) return res.status(400).json({message: "Både email och användarnamn upptaget"})
        if(usernameTaken) return res.status(400).json({message: "Användarnamnet är upptaget"})
        if(emailTaken) return res.status(400).json({message: "Emailen är upptaget"})
       
        const userHasAgeRequired = (((Date.now() - new Date(user.birthday)) / (31557600000)) > 18);
        if(!userHasAgeRequired) return res.status(400).json({message: "Du måste vara 18+ för att gå med!"})

        // Ip to get user location
        const userIp = await axios.get('https://ipapi.co/json/');
        user.ip = userIp.data.ip

        // Translate to swedish Country name (type: region ) but it means country
        const regionNamesInSwedish = new Intl.DisplayNames(['sv'], { type: 'region' });
        
        user.country = regionNamesInSwedish.of(userIp.data.country_code);
        user.region = userIp.data.region.split(" ")[0];

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
      const userData = await UserModel.findOne({ username: new RegExp(`^${usernameByParam}`, 'i') }).populate('pfp').lean();
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


export const updateVisitorCount = async (req, res) => {
    const { uniqueUserVisiting } = req.body;
  
    try {
      // Check if a visitor object already exists in the database
      const visitor = await VisitorModel.findOne();
  
      if (visitor) {
        // If a visitor object exists, update the count accordingly
        if (uniqueUserVisiting) {
          visitor.countRecurent++;
        } else {
            visitor.countUnique++;
        }

        await visitor.save();
      } else {
        // If no visitor object exists, create a new one with the appropriate count
        const newVisitor = new VisitorModel({
          countUnique: uniqueUserVisiting ? 1 : 0,
          countRecurent: uniqueUserVisiting ? 0 : 1,
        });
        await newVisitor.save();
      }
  
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
};



export const getVisitingCount = async (req, res) => {
  try {
    const db = mongoose.connection;

    // Use Promise.all to execute the database queries in parallel
    const [usersCount, chattCount, newestUser] = await Promise.all([
      // Use the aggregation framework to get the count of documents in each collection

      // userCount
      db.collection('users').aggregate([{ $count: 'count' }]).toArray(),
      
      // chattCount
      db.collection('globalchats').aggregate([{ $count: 'count' }]).toArray(),
      // Use an index to quickly retrieve the latest document
      
      // newestUser
      db.collection('users').findOne({}, { projection: { _id: 0, username: 1 }, sort: { dateJoined: -1 }, limit: 1 }),
    ]);

    res.status(200).send({
      visitors: await VisitorModel.findOne().lean(),
      userCount: usersCount[0].count,
      chattCount: chattCount[0].count,
      newestUser: newestUser ? newestUser.username : null, // Handle the case where there are no users in the collection
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};



export const uploadProfilePostMessage = async(req, res) => {
  const message = req.body;
  const receiverUsername = req.params.id;

  const receiver = await UserModel.findOne({ username: new RegExp(`^${receiverUsername}`, 'i') })
  
  

  try {
    // Reciver userData


    await ProfilePostMessageModel.create({
      text: message.text,
      receiver: receiver._id,
      creator: message.creator
    })
  } catch(err)
  {
    console.log(err);
    res.status(500).send('Server error');
  }
}

export const getProfilePostMessage = async(req, res) => {
  const receiverUsername = req.params.id;

  try {
    const receiver = await UserModel.findOne({ username: new RegExp(`^${receiverUsername}`, 'i') }).lean();
    const allMessages = await ProfilePostMessageModel.find({ receiver: receiver._id }).populate({
      path: 'creator',
      populate: { path: 'pfp' },
    }).populate('img').lean();;
  
    res.status(200).send({messages: allMessages})

  } catch(err)
  {
    console.log(err);
    res.status(500).send('Server error');
  }
}


// Forum psot
export const newForumPost = async(req, res) => {
  const {postData} = req.body;

  // bilder +++
  try {
    PostModel.create({
      title: postData.title,
      text: postData.text,
      tags: postData.tags,
      creator: postData.creator
    })
  } catch(err) {
    console.log(err);
    res.status(500).send('Server error');
  } 
}

export const getForumPosts = async(req, res) => {
  const posts = await PostModel.find().populate({
    path: 'creator',
    populate: { path: 'pfp' },
  }).populate('img');

  return res.status(200).send({posts: posts})
}