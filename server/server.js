import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";

// GraphQL Schema
const typeDefs = gql`
  type Query {
    hello(name: String): String
    test: String!
    isTrue: Boolean!
    add(num1: Int, num2: Int): Int!
    sub(num1: Int, num2: Int): Int!
    mul(num1: Int, num2: Int): Int!
    div(num1: Int, num2: Int): Int!
    combineName(firstName: String, lastName: String): String!
  }
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    hello: (_, args) => `Hello ${args.ame}`,
    test: () => "Test Completo!",
    isTrue: () => true,
    add: (_, { num1, num2 }) => num1 + num2,
    sub: (_, { num1, num2 }) => num1 - num2,
    mul: (_, { num1, num2 }) => num1 * num2,
    div: (_, { num1, num2 }) => num1 / num2,
    combineName: (_, { firstName, lastName }) =>
      `kiwkiw ${firstName} ${lastName}!`,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.info(`🚀 Server ready at ${url}`);
