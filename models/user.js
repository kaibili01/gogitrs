const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
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
        validate: {
          isUnique: (value, next) => {
            User.find({
              where: { username: value },
              attributes: ["id"]
            }).done((error, user) => {
              if (error) {
                return next(error);
              }
              if (user) {
                // We found a user with this email address.
                // Pass the error to the next method.
                return next("Email address already in use!");
              }
              // If we got this far, the email address hasn't been used yet.
              // Call next with no arguments when validation is successful.
              next();
            });
          }
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
          isEmail: true,
          isUnique: (value, next) => {
            User.find({
              where: { email: value },
              attributes: ["id"]
            }).done((error, user) => {
              if (error) {
                // Some unexpected error occured with the find method.
                return next(error);
              }
              if (user) {
                // We found a user with this email address.
                // Pass the error to the next method.
                return next("Email address already in use!");
              }
              // If we got this far, the email address hasn't been used yet.
              // Call next with no arguments when validation is successful.
              next();
            });
          }
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
