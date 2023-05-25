import mongoose from "mongoose";

const postScema = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    tags: {type: Array, required: false},
    creator: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    img: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image", required: false }],
    timestamp: {type: Date, default: () => Date.now()}
})

const PostModel = mongoose.model('posts', postScema);

export default PostModel;