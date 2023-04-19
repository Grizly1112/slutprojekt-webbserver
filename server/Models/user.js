import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    pfp: {type: Schema.Types.ObjectId, ref: "Image", default: "641cd8890707d47d40580268" /*"641cb16d6780fb6d236552e2"*/},
    dateOfBirth: {type: String, required: true},
    ip: {type: String, required: true},
    country: {type: String, required: true},
    region: {type: String, required: true},
    userDescription: {type: String},
    previousUsernames: {type: Array, default: []},
    lastSeen: {type: Date, default: () => Date.now},
    staff: {type: Boolean, default: false},
    dateJoined: {type: Date, default: () => Date.now()},
});

const UserModel = model('User', userSchema);

export default UserModel;