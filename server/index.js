import express from 'express'
const port = process.env.PORT || 8000

import mongoose from 'mongoose'
import cors from 'cors'
import { getuser, login, register } from './function/user.js';

// test
import Image from './Models/image.js';
import UserModel from './Models/user.js';

// Test
import bodyParser from 'body-parser';

/* It creates an instance of the express application. */
const app = express();

// /* Getting the database url and the server port from the environment variables. */

// const DatabaseUrl = process.env.DATABASE_URL;
// const ServerPort = process.env.PORT;

/* A middleware that parses the incoming request body and makes it available as a property on the request object. */



/* A middleware that allows the server to accept requests from different origins. */
app.use(cors())

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
app.use(bodyParser.text({ limit: '1mb' }));

/* It connects to the database and throws an error if it fails to connect. */
async function connectDb() {
    try {
        await mongoose.connect("mongodb+srv://webbserverprogrammering:webbserverprogrammering@webbserverprogrammering.2xgak87.mongodb.net/?retryWrites=true&w=majority");
        console.log("Databse Connected");
    } catch (error) {
        throw error;
    }
}

/* Connecting to the database. */
connectDb()

app.post("/user/register", register);
app.post("/user/login", login);
app.get("/user/getuser/:id", getuser);
app.post("/user/updateprofilepicture", async(req, res) => {
    const {newImage, useriD}= req.body;
    console.log(newImage)
    console.log(useriD)
    
    var userpfp = "";
    try {
        const createdimg = await Image.create({img: newImage.myFile});
        userpfp = createdimg._id;
        console.log("pfp: " + userpfp)
        createdimg.save()

        let user = await UserModel.findById(useriD);
        user.pfp = userpfp;
        await user.save();

        // ta bort förra  pfp bilder jao

        res.status(201).json({msg: "New image uploaded!!"})
    } catch(err) {
        throw err;
    }

})


app.get('/img', async(req, res) => {
     let img = await Image.findOne({_id: "641c8b667b1c40988a48e0e7"})
     console.log(img)
     res.status(200).send(img)
})


/* Listening to the port 8000. */
app.listen(8000, () => console.log("Servern lystnar på porten 8000"))