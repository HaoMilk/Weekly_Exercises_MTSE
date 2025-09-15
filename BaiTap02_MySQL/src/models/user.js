'use strict';


module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
firstName: { type: DataTypes.STRING, allowNull: false },
lastName: { type: DataTypes.STRING, allowNull: false },
email: { type: DataTypes.STRING, allowNull: false, unique: true },
address: { type: DataTypes.STRING },
gender: { type: DataTypes.STRING(10) }
}, {
tableName: 'users'
});


return User;
};