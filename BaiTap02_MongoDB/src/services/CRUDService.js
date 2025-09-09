import User from "../models/User.js";

export async function createNewUser(data) {
  const doc = await User.create(data);
  return doc.toObject();
}

export async function getAllUsers() {
  return await User.find({}).lean();
}

export async function getUserById(id) {
  return await User.findById(id).lean();
}

export async function updateUserData(id, data) {
  await User.findByIdAndUpdate(id, data, { runValidators: true });
  return await getUserById(id);
}

export async function deleteUserById(id) {
  await User.findByIdAndDelete(id);
  return true;
}
