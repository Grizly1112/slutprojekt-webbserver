import mongoose from "mongoose";

// https://www.youtube.com/watch?v=mbcofpC08Ug
// const imageSchema = new mongoose.Schema({
//     data: { type: Buffer, required: true }, 
//     contentType: { type: String, required: true }
// })
// https://youtu.be/pfxd7L1kzio
const imageSchema = new mongoose.Schema({
   img: String 
})


const Image = mongoose.model('Image', imageSchema);

export default Image;