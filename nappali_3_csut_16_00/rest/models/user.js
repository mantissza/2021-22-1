"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

const hashPassword = (user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(12));
};

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Rating);
        }

        comparePassword(password) {
            return bcrypt.compareSync(password, this.password);
        }

        toJSON() {
            let userData = this.get();
            if (userData.hasOwnProperty("password")) {
                delete userData.password;
            }
            return userData;
        }
    }
    User.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            isAdmin: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "User",
            // Ez azért nem jó, mert az objectben sincs benne a jelszó és a compare nem működik
            /*defaultScope: {
                attributes: { exclude: ['password'] },
            },*/
            hooks: {
                beforeCreate: hashPassword,
            },
        }
    );
    return User;
};
