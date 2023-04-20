import mongoose from "mongoose";

const vistorSchema = new mongoose.Schema({
   countUnique: {type: Number, required: true, default: 0}, 
   countRecurent: {type: Number, required: true, default: 0}, 
})

const VisitorModel = mongoose.model('visitor', vistorSchema);

export default VisitorModel;