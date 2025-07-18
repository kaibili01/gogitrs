// graphql/resolvers.js
const resolvers = {
  Query: {
    hello: () => "Hello from Apollo Server!",
  },
  Mutation: {
    sayHello: (_, { name }) => `Hello, ${name}!`,
  },
};

module.exports = resolvers;
