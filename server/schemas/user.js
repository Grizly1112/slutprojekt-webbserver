import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    dateJoined: {type: Date, default: () => Date.now()},
    userAbout: {type: String},
})

// Motsvarigehten Table: user, med query = userSChema
var UserModel = model('User', userSchema);

export default {UserModel};