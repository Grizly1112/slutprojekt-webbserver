import { getuser, login, register, uploadProfilePicture } from './function/user.js';
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Image from './Models/image.js';
import UserModel from './Models/user.js';
import bodyParser from 'body-parser';
import dotenv from "dotenv"
import { globalChatMessageGet, globalChatMessageUpload } from './function/globalchat.js';


/* Loading the environment variables from the .env file. */
dotenv.config()

/* It creates an express application. */
const app = express();

/* Setting the port to 8000 if the environment variable PORT is not set. */
const port = process.env.PORT || 8000


/* A middleware that allows the server to accept requests from different origins. */
app.use(cors())

/* A middleware that parses the body of the request. */
// Set limit to the parser, used with File-uploads. 
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(bodyParser.text({ limit: '5mb' }));

/* Connect to the database using a connection pool. */
const dbUrl = process.env.DB_CONNECTION_STR;
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(dbUrl, dbOptions)
  .then(() => console.log("MongoDB Databas är uppkopplad"))
  .catch(error => console.error(`Failed to connect to MongoDB: ${error.message}`));


/* Server Routes. */
app.post("/user/register", register);
app.post("/user/login", login);
app.get("/user/getuser/:id", getuser);
app.post("/user/updateprofilepicture", uploadProfilePicture)

app.get("/forum/getstatistics", (req, res) => {

})


app.post("/globalchat/send", globalChatMessageUpload)
app.get("/globalchat/get", globalChatMessageGet)


/* Listening to the port 8000. */
app.listen(8000, () => console.log("Servern lystnar på porten", (process.env.PORT || 8000)))