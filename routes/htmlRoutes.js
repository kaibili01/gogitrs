const Schema = require("../graphql/Schema");
const db = require("../models/db");
const { graphql } = require("graphql");
module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index", {
      msg: "Welcome!"
    });
  });
  app.get("/register", function (req, res) {
    res.render("register", {
      layout: "register-layout"
    });
  });
  app.get("/login", function (req, res) {
    res.render("login", {
      layout: "login-layout"
    });
  });
  app.get("/feed", function (req, res) {
    graphql(
      Schema,
      `
        {
          posts {
            quantity
            title
            city
            state
            date
            startTime
            endTime
            postedBy {
              username
              email
            }
          }
        }
      `,
      (root, args) => {
        return db.sequelize.models.Post.findAll({ where: args });
      }
    ).then(response => {
      res.render("searchResults", {
        layout: "login-layout",
        posts: response.data.posts
      });
    });
  });
  // Load example page and pass in an example by id
  app.get("/example/:id", (req, res) => {
    db.Example.findOne({ where: { id: req.params.id } }).then(dbExample => {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
