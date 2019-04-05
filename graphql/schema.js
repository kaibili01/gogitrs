const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");
const db = require("../models/db");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
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
      quantity: {
        type: GraphQLInt,
        resolve(post) {
          return post.quantity;
        }
      },
      instructions: {
        type: GraphQLString,
        resolve(post) {
          return post.instructions;
        }
      },
      address: {
        type: GraphQLString,
        resolve(post) {
          return post.address;
        }
      },
      city: {
        type: GraphQLString,
        resolve(post) {
          return post.city;
        }
      },
      state: {
        type: GraphQLString,
        resolve(post) {
          return post.state;
        }
      },
      date: {
        type: GraphQLString,
        resolve(post) {
          return post.date;
        }
      },
      startTime: {
        type: GraphQLString,
        resolve(post) {
          return post.startTime;
        }
      },
      endTime: {
        type: GraphQLString,
        resolve(post) {
          return post.endTime;
        }
      },
      postedBy: {
        type: User,
        resolve(post) {
          return post.getUser();
        }
      }
    };
  }
});
const AuthPayload = new GraphQLObjectType({
  name: "AuthPayload",
  description: "This is what results from a successful login",
  fields: () => {
    return {
      token: {
        type: GraphQLString,
        resolve(payload) {
          return payload.token;
        }
      },
      user: {
        type: User,
        resolve(payload) {
          return payload.user;
        }
      }
    };
  }
});

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
      }
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Functions to create stuff",
  fields: () => {
    return {
      login: {
        type: AuthPayload,
        args: {
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        async resolve(parent, args, context, info) {
          const user = await db.sequelize.models.User.findOne({
            where: { username: args.username }
          });
          console.log("Username: ", user.dataValues.username);
          if (!user) {
            throw new Error("No such user found");
          }
          let valid = await bcrypt.compareSync(args.password, user.password);
          console.log("isValid:", valid);
          if (!valid) {
            throw new Error("Invalid password");
          }

          const token = await jwt.sign(
            { userId: user.id },
            process.env.APP_SECRET
          );
          console.log("JSON Web Token:", token);
          return {
            token,
            user
          };
        }
      },
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
        resolve(parent, args, context, info) {
          return db.sequelize.models.User.create({
            firstName: args.firstName,
            lastName: args.lastName,
            username: args.username,
            password: bcrypt.hashSync(args.password),
            email: args.email.toLowerCase(),
            calendar: "[]",
            permissions: `{
              post: true,
              harvest: true,
              admin: false,
            }`
          });
        }
      },
      addPost: {
        type: Post,
        args: {
          title: {
            type: new GraphQLNonNull(GraphQLString)
          },
          quantity: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          instructions: {
            type: GraphQLString
          },
          address: {
            type: new GraphQLNonNull(GraphQLString)
          },
          city: {
            type: new GraphQLNonNull(GraphQLString)
          },
          state: {
            type: new GraphQLNonNull(GraphQLString)
          },
          date: {
            type: new GraphQLNonNull(GraphQLString)
          },
          startTime: {
            type: new GraphQLNonNull(GraphQLString)
          },
          endTime: {
            type: new GraphQLNonNull(GraphQLString)
          }
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
