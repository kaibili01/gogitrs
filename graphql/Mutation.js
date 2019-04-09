const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} = require("graphql");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");
const { User, Post, AuthPayload, Reservation } = require("./TypeDefs");
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
          if (!user) {
            throw new Error("No such user found");
          }
          let valid = await bcrypt.compareSync(args.password, user.password);
          if (!valid) {
            throw new Error("Invalid password");
          }

          const token = await jwt.sign(
            { userId: user.id },
            process.env.APP_SECRET
          );
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
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        async resolve(parent, args) {
          const decrypted = jwt.verify(args.userId, process.env.APP_SECRET);
          return db.sequelize.models.User.findByPk(decrypted.userId).then(
            user => {
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
            }
          );
        }
      },
      addReservation: {
        type: Reservation,
        args: {
          jwt: {
            type: new GraphQLNonNull(GraphQLString)
          },
          postId: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        async resolve(parent, args) {
          const decrypted = await jwt.verify(args.jwt, process.env.APP_SECRET);
          return db.sequelize.models.Reservation.create({
            userId: parseInt(decrypted.userId),
            PostId: args.postId
          });
        }
      },
      removeReservation: {
        type: Reservation,
        args: {
          jwt: {
            type: new GraphQLNonNull(GraphQLString)
          },
          postId: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        async resolve(parent, args) {
          const decrypted = await jwt.verify(args.jwt, process.env.APP_SECRET);
          return db.sequelize.models.Reservation.destroy({
            where: {
              userId: parseInt(decrypted.userId),
              PostId: args.postId
            }
          });
        }
      },
      removeUser: {
        type: User,
        args: {
          jwt: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        async resolve(parent, args) {
          const decrypted = await jwt.verify(args.jwt, process.env.APP_SECRET);
          return db.sequelize.models.User.destroy({
            where: {
              id: parseInt(decrypted.userId)
            }
          });
        }
      }
    };
  }
});

module.exports = Mutation;
