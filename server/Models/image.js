import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
   data: Buffer, 
})

const Image = mongoose.model('Image', imageSchema);

export default Image;