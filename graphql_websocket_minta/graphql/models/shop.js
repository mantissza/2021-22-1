"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Item);
      this.belongsToMany(models.Warehouse, { through: 'ShopWarehouse' });
    }
  }
  Shop.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      city: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Shop",
    }
  );
  return Shop;
};