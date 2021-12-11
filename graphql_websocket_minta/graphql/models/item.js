"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Shop);
    }
  }
  Item.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.NUMBER
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};