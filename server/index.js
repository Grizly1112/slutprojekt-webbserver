import express from 'express'
const port = process.env.PORT || 8000

import mongoose from 'mongoose'
import cors from 'cors'
import { getuser, login, register } from './function/user.js';

/* It creates an instance of the express application. */
const app = express();

// /* Getting the database url and the server port from the environment variables. */

// const DatabaseUrl = process.env.DATABASE_URL;
// const ServerPort = process.env.PORT;

/* A middleware that parses the incoming request body and makes it available as a property on the request object. */
app.use(express.json());

/* A middleware that allows the server to accept requests from different origins. */
app.use(cors())

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

/* Listening to the port 8000. */
app.listen(8000, () => console.log("Servern lystnar på porten 8000"))