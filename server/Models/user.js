import mongoose from 'mongoose'
import ip from 'ip'


const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    profilePicture: {type: mongoose.Schema.Types.ObjectId, ref: "Image"},
    dateOfBirth: {type: String, required: true},
    ip: {type: String, required: true},
    country: {type: String, required: true},
    region: {type: String, required: true},
    userDescription: {type: String},
    staff: {type: Boolean, default: false},
    dateJoined: {type: Date, default: () => Date.now()},
})

var UserModel = mongoose.model('User', userSchema);

export default UserModel;