import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { ApolloServer } from "@apollo/server";
console.log(Object.keys(apollo));
import { expressMiddleware } from "@apollo/server/express4"; // correct import for Apollo Server v5 + Express 4
import bodyParser from "body-parser";
import exphbs from "express-handlebars";

import typeDefs from "./apollo/typeDefs.js";
import resolvers from "./apollo/resolvers.js";

import apiRoutes from "./routes/apiRoutes.js";
import htmlRoutes from "./routes/htmlRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware for parsing URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars view engine setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Register your REST API routes
apiRoutes(app);
htmlRoutes(app);

async function startApolloServer() {
  // Create Apollo Server instance
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start Apollo Server
  await apolloServer.start();

  // Mount Apollo Server middleware on /graphql route
  app.use(
    "/graphql",
    bodyParser.json(),
    expressMiddleware(apolloServer)
  );

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

// Start everything
startApolloServer();
