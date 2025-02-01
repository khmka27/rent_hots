'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apartment extends Model {
    static associate({ User, Favorite, Category, Photo }) {
      this.belongsTo(User, { foreignKey: 'ownerId' });
      this.hasMany(Favorite, { foreignKey: 'apartmentId' });
      this.belongsTo(Category, { foreignKey: 'categoryId' });
      this.hasMany(Photo, { foreignKey: 'apartmentId' });
    }
  }
  Apartment.init(
    {
      name: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      desc: DataTypes.TEXT,
      coordinates: DataTypes.STRING,
      ownerId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      isReserve: DataTypes.BOOLEAN,
      mapLink:DataTypes.STRING,
      latitude:DataTypes.STRING,
      longitude:DataTypes.STRING,
      imageUrl:DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Apartment',
    },
  );
  return Apartment;
};
