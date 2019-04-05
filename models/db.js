"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};
const _ = require("lodash"); //used for repeatedly adding data
const faker = require("faker"); //used for generating mock data

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Relationships
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  // _.times(10, () => {
  //   return db.User.create({
  //     firstName: faker.name.firstName(),
  //     lastName: faker.name.lastName(),
  //     username: faker.internet.userName(),
  //     password: faker.internet.password(),
  //     email: faker.internet.email(),
  //     calendar: "{}",
  //     permissions: JSON.stringify({
  //       post: faker.random.boolean(),
  //       harvest: faker.random.boolean(),
  //       admin: false
  //     })
  //   }).then(user => {
  //     return user.createPost({
  //       title: `Sample title by ${user.firstName} ${user.lastName}`,
  //       quantity: faker.random.number(),
  //       instructions: "This is a sample post",
  //       address: faker.address.streetAddress(),
  //       city: faker.address.city(),
  //       state: faker.address.stateAbbr(),
  //       date: "April 16th 2019",
  //       startTime: "10:00 AM",
  //       endTime: "04:00 PM"
  //     });
  //   });
  // });
});

module.exports = db;
