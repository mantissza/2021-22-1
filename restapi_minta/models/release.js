"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Release extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Game);
        }
    }
    Release.init(
        {
            platform: {
                type: DataTypes.ENUM("win", "ps2", "ps3", "ps4", "ps5", "xbox360", "xboxone"),
                validate: {
                    isIn: {
                        args: [["win", "ps2", "ps3", "ps4", "ps5", "xbox360", "xboxone"]],
                        msg: "Invalid platform",
                    },
                },
            },
            date: DataTypes.DATE,
            version: DataTypes.STRING,
            GameId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Release",
        }
    );
    return Release;
};
