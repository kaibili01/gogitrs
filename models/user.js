const bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username already in use!"
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        },
        unique: {
          args: true,
          msg: "Email address already in use!"
        }
      },
      calendar: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      permissions: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      instanceMethods: {
        generateHash(password) {
          return bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword(password) {
          return bcrypt.compare(password, this.password);
        }
      }
    }
  );

  return User;
};
