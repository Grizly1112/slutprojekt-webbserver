import mongoose from "mongoose";

const globalChatSchema = new mongoose.Schema({
    text: {type: String, required: false},
    creator: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    img: {type: mongoose.Schema.Types.ObjectId, ref: "Image", required: false},
    timestamp: {type: Date, default: () => Date.now()},
    likes: {type: Array, default: [], required: true},
})

const GlobalChatModel = mongoose.model('GlobalChat', globalChatSchema);

export default GlobalChatModel;