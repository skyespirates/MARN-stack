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
  }
  type Book {
    id: ID
    title: String
    year: Int
  }
  type User {
    firstName: String!
    lastName: String!
    email: String!
    address: String!
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
  }
`;
