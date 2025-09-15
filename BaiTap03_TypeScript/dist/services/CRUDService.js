"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = createNewUser;
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const models_1 = __importDefault(require("../models"));
async function createNewUser(data) {
    const user = await models_1.default.User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
        gender: data.gender
    });
    return user.toJSON();
}
async function getAllUsers() {
    const users = await models_1.default.User.findAll({ order: [['id', 'DESC']] });
    return users.map((u) => {
        const json = u.toJSON();
        return { _id: json.id, ...json };
    });
}
async function getUserById(id) {
    const u = await models_1.default.User.findByPk(id);
    if (!u)
        return null;
    const json = u.toJSON();
    return { _id: json.id, ...json };
}
async function updateUser(data) {
    const identifier = (data.id ?? data._id);
    if (identifier === undefined)
        return null;
    const u = await models_1.default.User.findByPk(identifier);
    if (!u)
        return null;
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
    const deleted = await models_1.default.User.destroy({ where: { id } });
    return deleted > 0;
}
