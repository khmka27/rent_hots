'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Apartments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull:false,
        type: Sequelize.STRING
      },
      categoryId: {
        allowNull:false,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER
      },
      address: {
        allowNull:false,
        type: Sequelize.STRING
      },
      desc: {
        allowNull:false,
        defaultValue: '',
        type: Sequelize.TEXT
      },
      coordinates: {
        allowNull:true,
        type: Sequelize.STRING
      },
      ownerId: {
        allowNull:true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER
      },
      price: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      isReserve: {
        defaultValue:'false',
        type: Sequelize.BOOLEAN
      },
      mapLink:{
        allowNull:true,
        type: Sequelize.STRING,
      },
      latitude:{
        allowNull:true,
        type: Sequelize.STRING,
      },
      longitude:{
        allowNull:true,
        type: Sequelize.STRING,
      },
      imageUrl:{
        allowNull:true,
        type: Sequelize.STRING,
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Apartments');
  }
};