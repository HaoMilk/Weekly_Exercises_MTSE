const db = require('../models');


async function createNewUser(data) {
const user = await db.User.create({
firstName: data.firstName,
lastName: data.lastName,
email: data.email,
address: data.address,
gender: data.gender
});
return user.toJSON();
}


async function getAllUsers() {
const users = await db.User.findAll({ order: [['id', 'DESC']] });
return users.map(u => {
const json = u.toJSON();
return { _id: json.id, ...json };
});
}


async function getUserById(id) {
const u = await db.User.findByPk(id);
if (!u) return null;
const json = u.toJSON();
return { _id: json.id, ...json };
}


async function updateUser(data) {
const u = await db.User.findByPk(data.id || data._id);
if (!u) return null;
await u.update({
firstName: data.firstName,
lastName: data.lastName,
email: data.email,
address: data.address,
gender: data.gender
});
const json = u.toJSON();
return { _id: json.id, ...json };
}


async function deleteUser(id) {
const deleted = await db.User.destroy({ where: { id } });
return deleted > 0;
}


module.exports = {
createNewUser,
getAllUsers,
getUserById,
updateUser,
deleteUser
};