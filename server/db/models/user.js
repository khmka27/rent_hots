'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  
    static associate({Favorite, Apartment}) {
      this.belongsToMany(Apartment, {through: Favorite, foreignKey:'userId'})
      this.hasMany(Apartment,{foreignKey:'ownerId'})
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};