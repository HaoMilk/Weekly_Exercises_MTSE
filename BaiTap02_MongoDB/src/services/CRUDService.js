// src/services/CRUDService.js
import User from '../models/user.model.js';


export async function createNewUser(data) {
const user = await User.create(data);
return user.toObject();
}


export async function getAllUsers() {
const users = await User.find().sort({ createdAt: -1 }).lean();
return users;
}


export async function getUserById(id) {
const user = await User.findById(id).lean();
return user;
}


export async function updateUser(data) {
const { id, ...rest } = data;
const updated = await User.findByIdAndUpdate(id, rest, { new: true }).lean();
return updated;
}


export async function deleteUserById(id) {
await User.findByIdAndDelete(id);
return true;
}