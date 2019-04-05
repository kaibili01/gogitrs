const { 
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");
const db = require("../models/db");

const User = new GraphQLObjectType ({
  name: "User",
  description: "This represents a User",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(user){
          return user.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(user){
          return user.name
        }
      },
      description: {
        type: GraphQLString,
        resolve(user){
          return user.description
        }
      },
      username: {
        type: GraphQLString,
        resolve(user){
          return user.username
        }
      },
      password: {
        type: GraphQLString,
        resolve(user){
          return user.password
        
      },
      accountType: {
        type: GraphQLString,
        resolve(user){
          return user.accountType
        }
      },
      email: {
        type: GraphQLString,
        resolve(user){
          return user.email
        }
      },
      address: {
        type: GraphQLString,
        resolve(user){
          return user.address
        }
      },
      city: {
        type: GraphQLString,
        resolve(user){
          return user.city
        }
      },
      state: {
        type: GraphQLString,
        resolve(user){
          return user.state
        }
      },
      calendar: {
        type: GraphQLString,
        resolve(user){
          return user.calendar
        }
      },
      permissions: {
        type: GraphQLString,
        resolve(user){
          return user.permissions
        }
      },
    };
  }
});

const Post = new GraphQLObjectType ({
  name: "Post",
  description: "This is a post",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(post){
          return post.id;
        }
      },
      title: {
        type: GraphQLString,
        resolve(post){
          return post.title
        }
      },
      description: {
        type: GraphQLString,
        resolve(post){
          return post.description
        }
      },
      availability: {
        type: GraphQLString,
        resolve(post){
          return post.availability
        }
      },
    }
  }
})

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
        resolve (root, args) {
          return db.sequelize.models.User.findAll({where: args});
        }
      }
    }
  }
})

const Schema = new GraphQLSchema ({
  query: Query,
});

module.exports = Schema;