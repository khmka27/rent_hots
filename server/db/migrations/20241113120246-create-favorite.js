'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      apartmentId: {
        allowNull: false,
        references: {
          model: 'Apartments',
          key: 'id',
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favorites');
  },
};
