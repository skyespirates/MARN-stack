import gql from "graphql-tag";
import { Book } from "./Book.js";

export const typeDefs = gql`
  type Query {
    books: [Book]
  }

  type Mutation {
    create(title: String!, year: Int!, author: String!): Book
    delete(id: ID): ID
    edit(id: ID, title: String, year: Int, author: String): Book
  }

  type Book {
    id: ID
    title: String
    year: Int
    author: String
  }
`;

export const resolvers = {
  Query: {
    books: async () => await Book.find({}),
  },
  Mutation: {
    create: async (_, { title, year, author }) => {
      const book = await Book.create({ title, year, author });
      return book;
    },
    delete: async (_, { id }) => {
      const result = await Book.deleteOne({ _id: id });
      if (result.acknowledged && result.deletedCount === 1) {
        return id;
      }
      return null;
    },
    edit: async (_, { id, title, year, author }) => {
      try {
        const book = {
          id,
          title,
          year,
          author,
        };

        const updatedBook = await Book.findByIdAndUpdate(id, book, {
          new: true,
        });
        return updatedBook;
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    },
  },
};
