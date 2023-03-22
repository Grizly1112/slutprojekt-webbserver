import mongoose from 'mongoose'
import ip from 'ip'


const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    profilePicture: {type: mongoose.Schema.Types.ObjectId, ref: "Image"},
    ip: {type: String, required: true},
    userDescription: {type: String},
    authLevel: {type: Number, default: 0},
    dateJoined: {type: Date, default: () => Date.now()},
})

var UserModel = mongoose.model('User', userSchema);

export default UserModel;