// src/models/user.model.js
import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema(
{
firstName: { type: String, required: true, trim: true },
lastName: { type: String, required: true, trim: true },
email: { type: String, required: true, unique: true, lowercase: true },
password: { type: String, required: true },
address: { type: String, default: '' }, 
phoneNumber: { type: String, default: '' },
gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
image: { type: String, default: '' },
role: { type: String, enum: ['admin', 'user'], default: 'user' },
position: { type: String, enum: ['developer', 'designer', 'manager', 'other'], default: 'developer' },
},
{ timestamps: true }
);


export default mongoose.model('User', UserSchema);