'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate({ Apartment }) {
      this.belongsTo(Apartment, { foreignKey: 'apartmentId' });
    }
  }
  Photo.init(
    {
      photo: DataTypes.STRING,
      apartmentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Photo',
    },
  );
  return Photo;
};
