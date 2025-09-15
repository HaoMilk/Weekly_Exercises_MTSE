'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, dataTypes) => {
    const User = sequelize.define('User', {
        firstName: { type: dataTypes.STRING, allowNull: false },
        lastName: { type: dataTypes.STRING, allowNull: false },
        email: { type: dataTypes.STRING, allowNull: false, unique: true },
        address: { type: dataTypes.STRING },
        gender: { type: dataTypes.STRING(10) }
    }, {
        tableName: 'users'
    });
    return User;
};
