"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Carrier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Warehouse);
    }
  }
  Carrier.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      numberOfCars: DataTypes.NUMBER,
      carCapacity: DataTypes.NUMBER
    },
    {
      sequelize,
      modelName: "Carrier",
    }
  );
  return Carrier;
};