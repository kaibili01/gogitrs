const Schema = require("../graphql/Schema");
const db = require("../models/db");
const { graphql } = require("graphql");
require("dotenv").config();
module.exports = app => {
  // Load index page
  app.get("/", (req, res) => {
    res.render("index", {
      msg: "Welcome!"
    });
  });
  app.get("/register", (req, res) => {
    res.render("register", {
      layout: "register-layout"
    });
  });
  app.get("/login", (req, res) => {
    res.render("login", {
      layout: "login-layout"
    });
  });
  app.get("/newpost", (req, res) => {
    res.render("new-post", {
      layout: "new-post-layout"
    });
  });
  app.get("/search", (req, res) => {
    res.render("search", {
      layout: "search-layout"
    });
  });
  app.get("/calendar", (req, res) => {
    res.render("my-calendar", {
      layout: "my-calendar-layout"
    });
  });
  app.get("/home", (req, res) => {
    res.render("navigation", {
      layout: "navigation-layout"
    });
  });
  app.get("/feed", (req, res) => {
    graphql(
      Schema,
      `
        {
          posts {
            id
            quantity
            title
            instructions
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
        layout: "searchResults-layout",
        posts: response.data.posts
      });
    });
  });

  app.get("/maps", (req, res) => {
    graphql(
      Schema,
      `
        {
          posts {
            quantity
            title
            instructions
            address
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
      res.render("searchMaps", {
        layout: "searchMaps-layout",
        posts: response.data.posts,
        googleKey: process.env.GOOGLE_API_KEY
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
