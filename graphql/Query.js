const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require("graphql");
const db = require("../models/db");
const { User, Post, Reservation } = require("./TypeDefs");

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
        resolve(root, args) {
          return db.sequelize.models.Post.findAll({ where: args });
        }
      },
      reservations: {
        type: new GraphQLList(Reservation),
        resolve(root, args) {
          return db.sequelize.models.Reservation.findAll({ where: args });
        }
      }
    };
  }
});

module.exports = Query;
