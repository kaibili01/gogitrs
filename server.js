require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const graphHTTP = require("express-graphql");
const Schema = require("./graphql/schema");
const db = require("./models/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/graphql", graphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


app.listen(PORT, function() {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});

module.exports = app;
