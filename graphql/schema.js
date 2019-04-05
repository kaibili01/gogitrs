const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");
const db = require("../models/db");

const User = new GraphQLObjectType({
  name: "User",
  description: "This represents a User",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(user) {
          return user.id;
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(user) {
          return user.firstName;
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(user) {
          return user.lastName;
        }
      },
      username: {
        type: GraphQLString,
        resolve(user) {
          return user.username;
        }
      },
      password: {
        type: GraphQLString,
        resolve(user) {
          return user.password;
        }
      },
      email: {
        type: GraphQLString,
        resolve(user) {
          return user.email;
        }
      },
      calendar: {
        type: GraphQLString,
        resolve(user) {
          return user.calendar;
        }
      },
      permissions: {
        type: GraphQLString,
        resolve(user) {
          return user.permissions;
        }
      }
    };
  }
});
const Post = new GraphQLObjectType({
  name: "Post",
  description: "This is a post",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(post) {
          return post.id;
        }
      },
      title: {
        type: GraphQLString,
        resolve(post) {
          return post.title;
        }
      },
      description: {
        type: GraphQLString,
        resolve(post) {
          return post.description;
        }
      },
      address: {
        type: GraphQLString,
        resolve(user) {
          return user.address;
        }
      },
      city: {
        type: GraphQLString,
        resolve(user) {
          return user.city;
        }
      },
      state: {
        type: GraphQLString,
        resolve(user) {
          return user.state;
        }
      },
      availability: {
        type: GraphQLString,
        resolve(post) {
          return post.availability;
        }
      },
    };
  }
});

const Query = new GraphQLObjectType({
  name: "Query",
  description: "This is a root query",
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
      }
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Functions to create stuff",
  fields: () => {
    return {
      addUser: {
        type: User,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, args) {
          return db.sequelize.models.User.create({
            firstName: args.firstName,
            lastName: args.lastName,
            username: args.username,
            password: args.password,
            email: args.email.toLowerCase(),
            calendar: "[]",
            permissions: `{
              post: true,
              harvest: true,
              admin: false,
            }`
          });
        }
      }
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = Schema;