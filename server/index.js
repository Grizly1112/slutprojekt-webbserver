// Import packages 
const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');


/* It creates an instance of the express application. */
const app = express();

/* Getting the database url and the server port from the environment variables. */
const DatabaseUrl = process.env.DATABASE_URL;
const ServerPort = process.env.PORT;

/* A middleware that parses the incoming request body and makes it available as a property on the
request object. */
app.use(express.json());

/* A middleware that allows the server to accept requests from different origins. */
app.use(cors())

/**
 * It connects to the database and throws an error if it fails to connect.
 */
async function connectDb() {
    try {
        await mongoose.connect(DatabaseUrl);
        console.log("Databse Connected");
    } catch (error) {
        throw error;
    }
}

/* Connecting to the database. */
connectDb()





/* Listening to the port 8000. */
app.listen(ServerPort, () => console.log("Servern lystnar på porten 8000"))