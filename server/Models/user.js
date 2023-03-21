import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    profilePicture: {type: mongoose.Schema.Types.ObjectId, ref: "Image"},
    userDescription: {type: String},
    authLevel: {type: Number, default: 0},
    dateJoined: {type: Date, default: () => Date.now()},
})

var UserModel = mongoose.model('User', userSchema);

export default UserModel;