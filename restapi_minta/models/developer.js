"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Developer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Game);
        }
    }
    Developer.init(
        {
            name: DataTypes.STRING,
            website: DataTypes.STRING,
            location: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Developer",
        }
    );
    return Developer;
};
