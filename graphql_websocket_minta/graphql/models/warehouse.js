"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Shop, { through: 'ShopWarehouse' });
      this.hasMany(models.Carrier);
    }
  }
  Warehouse.init(
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      capacity: DataTypes.NUMBER
    },
    {
      sequelize,
      modelName: "Warehouse",
    }
  );
  return Warehouse;
};