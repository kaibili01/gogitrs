const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} = require("graphql");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");
const { User, Post, AuthPayload } = require("./TypeDefs");
require("dotenv").config();

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
        async resolve(parent, args) {
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
        resolve(parent, args) {
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
          },
          userId: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(parent, args) {
          return db.sequelize.models.User.findById(args.userId).then(user => {
            return user.createPost({
              title: args.title,
              lastName: args.lastName,
              quantity: args.quantity,
              instructions: args.instructions,
              address: args.address,
              city: args.city,
              state: args.state,
              date: args.date,
              startTime: args.startTime,
              endTime: args.endTime
            });
          });
        }
      }
    };
  }
});

module.exports = Mutation;
