import mongoose from "mongoose";

const profilePostMessageSchema = new mongoose.Schema({
    text: {type: String, required: false},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    img: {type: mongoose.Schema.Types.ObjectId, ref: "Image", required: false},
    timestamp: {type: Date, default: () => Date.now()}
})

const ProfilePostMessageModel = mongoose.model('ProfilePost', profilePostMessageSchema);

export default ProfilePostMessageModel;