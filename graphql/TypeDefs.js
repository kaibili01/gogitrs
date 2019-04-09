const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

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
          return payload.getUser();
        }
      }
    };
  }
});
const Reservation = new GraphQLObjectType({
  name: "Reservation",
  description: "This is how a user knows what events he has RSVPd to.",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(reservation) {
          return reservation.id;
        }
      },
      user: {
        type: User,
        resolve(reservation) {
          return reservation.getUser();
        }
      },
      post: {
        type: Post,
        resolve(reservation) {
          return reservation.getPost();
        }
      }
    };
  }
});
module.exports = {
  User,
  Post,
  AuthPayload,
  Reservation
};
