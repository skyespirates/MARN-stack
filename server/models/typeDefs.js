import gql from "graphql-tag";

// GraphQL Schema
export const typeDefs = gql`
  type Query {
    hello(name: String!): String
    test: String!
    isTrue: Boolean!
    add(num1: Int, num2: Int): Int!
    sub(num1: Int, num2: Int): Int!
    mul(num1: Int, num2: Int): Int!
    div(num1: Int, num2: Int): Int!
    combineName(firstName: String, lastName: String): String!
    books: [Book]
    user(
      firstName: String!
      lastName: String!
      email: String!
      address: String!
    ): User!
    getAllUsers: [User]
    getUserById(id: ID): User
  }
  type Mutation {
    registerUser(
      firstName: String!
      lastName: String!
      email: String!
      address: String!
    ): User
    create(title: String, year: Int): Book
    delete(id: ID): ID
    edit(id: ID, title: String, year: Int): Book
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
  type Book {
    id: ID
    title: String
    year: Int
  }
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    address: String!
  }
`;
