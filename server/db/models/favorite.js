'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate({ User, Apartment}) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Apartment, { foreignKey: 'apartmentId' });
    }
  }
  Favorite.init(
    {
      userId: DataTypes.INTEGER,
      apartmentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Favorite',
    },
  );
  return Favorite;
};
