import mongoose from "mongoose";

const postScema = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    tags: {type: Array, required: false, default: []},
    creator: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    img: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image", required: false }],
    likes: {type: Array,default: [], required: true},
    visitors: {type: Number, default: 0, required: true},
    timestamp: {type: Date, default: () => Date.now()}
})

const PostModel = mongoose.model('posts', postScema);

export default PostModel;