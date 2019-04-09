const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require("graphql");
const db = require("../models/db");
const { User, Post, Reservation } = require("./TypeDefs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Query = new GraphQLObjectType({
  name: "Query",
  description: "This is just any ol' query",
  fields: () => {
    return {
      users: {
        type: new GraphQLList(User),
        args: {
          id: {
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return db.sequelize.models.User.findAll({ where: args });
        }
      },
      posts: {
        type: new GraphQLList(Post),
        args: {
          id: {
            type: new GraphQLList(GraphQLInt)
          }
        },
        resolve(root, args) {
          return db.sequelize.models.Post.findAll({ where: args });
        }
      },
      reservations: {
        type: new GraphQLList(Reservation),
        args: {
          userId: {
            type: GraphQLString
          }
        },
        async resolve(root, args) {
          const decrypted = jwt.verify(args.userId, process.env.APP_SECRET);
          const reservations = await db.sequelize.models.Reservation.findAll({
            where: { userId: decrypted.userId }
          });
          return reservations;
        }
      }
    };
  }
});

module.exports = Query;
