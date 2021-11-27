"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Game extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Developer);
            this.hasMany(models.Release);
            this.belongsToMany(models.Genre, { through: "GenreGame" });
        }
    }
    Game.init(
        {
            title: DataTypes.STRING,
            writers: DataTypes.STRING,
            description: DataTypes.STRING,
            singleplayer: DataTypes.BOOLEAN,
            multiplayer: DataTypes.BOOLEAN,
            engine: DataTypes.STRING,
            DeveloperId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Game",
        }
    );
    return Game;
};
