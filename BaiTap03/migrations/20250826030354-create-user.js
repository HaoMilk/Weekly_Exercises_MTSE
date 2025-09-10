'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      firstName: { type: Sequelize.STRING(100), allowNull: false },
      lastName: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(150), allowNull: false, unique: true },
      address: { type: Sequelize.STRING(255), allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  }
};
