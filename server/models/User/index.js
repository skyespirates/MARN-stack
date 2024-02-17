import gql from "graphql-tag";
import { User } from "./User.js";

export const typeDefs = `
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    address: String!
  }

  type Query {
    getAllUsers: [User]
    getUserById(id: ID): User
    user(
      firstName: String!
      lastName: String!
      email: String!
      address: String!
    ): User!
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      address: String!
    ): Boolean
    updateUser(
      id: ID!
      firstName: String
      lastName: String
      email: String
      address: String
    ): Boolean
    deleteUser(id: ID): Boolean
  }
`;
export const resolvers = {
  Query: {
    user: (_, { firstName, lastName, email, address }) => {
      return {
        firstName,
        lastName,
        email,
        address,
      };
    },
    getAllUsers: async () => await User.find(),
    getUserById: async (_, { id }) => {
      const res = await User.findById(id);
      return res;
      // return res;
    },
  },
  Mutation: {
    createUser: async (_, { firstName, lastName, email, address }) => {
      const res = await User.create({ firstName, lastName, email, address });
      if (res.firstName && res.lastName) return true;
      return false;
    },
    updateUser: async (_, { id, firstName, lastName, email, address }) => {
      const res = await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
        email,
        address,
      });
      console.log(res);
      // if (res.firstName && res.lastName) return true;
      return false;
    },
    deleteUser: async (_, { id }) => {
      const res = await User.findByIdAndDelete(id);
      if (res === null) return false;
      return true;
    },
  },
};
