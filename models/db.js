"use strict";

require("dotenv").config();
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};
var _ = require("lodash");
var faker = require("faker");

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
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
db.sequelize.sync(syncOptions).then(function() {
  // console.log(db.sequelize.models);
  // _.times(10, () => {
  //   return db.User.create({
  //     name: faker.name.findName(),
  //     description: "I am a fake person!",
  //     username: faker.internet.userName(),
  //     password: faker.internet.password(),
  //     accountType: "homeowner",
  //     email: faker.internet.email(),
  //     address: faker.address.streetAddress(),
  //     city: faker.address.city(),
  //     state: faker.address.stateAbbr(),
  //     calendar: '{}',
  //     permissions: `{
  //       post: ${faker.random.boolean()},
  //       harvest: ${faker.random.boolean()},
  //       admin: false,
  //     }`,
  //   }).then(user => {
  //     return user.createPost({
  //       title: `Sample title by ${user.name}`,
  //       description: `This is a sample post`,
  //       availability: `[{
  //         start: '12:00PM April 16th 2019',
  //         end: '04:00PM April 16, 2019',
  //       }]`,
  //     });
  //   });
  // })
});

module.exports = db;
