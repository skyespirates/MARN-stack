import gql from "graphql-tag";
import Customer from "./Customer.js";

export const typeDefs = `
  type Customer {
    id: ID
    name: String
    age: Int
    createdAt: String
    updatedAt: String
  }

  type Query {
    getCustomerList: [Customer]
    getCustomerById(id: ID): Customer
  }

  type Mutation {
    addCustomer(name: String, age: Int): Customer
    updateCustomer(id: ID!, name: String, age: Int): Customer
  }
`;

export const resolvers = {
  Query: {
    getCustomerList: async () => await Customer.find({}),
    getCustomerById: async (_, { id }) => await Customer.findById(id),
  },
  Mutation: {
    addCustomer: async (_, { name, age }) => {
      const customer = await Customer.create({ name, age });
      return customer;
    },
    updateCustomer: async (_, { id, name, age }) =>
      await Customer.findByIdAndUpdate(id, { name, age }, { new: true }),
  },
};
