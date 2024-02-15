import { Book } from "./models/Book.js";
// GraphQL Resolvers
export const resolvers = {
  Query: {
    hello: (_, args) => `Hello ${args.name}`,
    test: () => "Test Completo!",
    isTrue: () => true,
    add: (_, { num1, num2 }) => num1 + num2,
    sub: (_, { num1, num2 }) => num1 - num2,
    mul: (_, { num1, num2 }) => num1 * num2,
    div: (_, { num1, num2 }) => num1 / num2,
    combineName: (_, { firstName, lastName }) =>
      `kiwkiw ${firstName} ${lastName}!`,
    books: async () => await Book.find({}),
  },
  Mutation: {
    registerUser: (_, { firstName, lastName, email, address }) => {
      const userData = {
        firstName,
        lastName,
        email,
        address,
      };
      return userData;
    },
    create: async (_, { title, year }) => {
      const book = await Book.create({ title, year });
      return book;
    },
    delete: async (_, { id }) => {
      const result = await Book.deleteOne({ _id: id });
      if (result.acknowledged && result.deletedCount === 1) {
        return id;
      }
      return null;
    },
    edit: async (_, { id, title, year }) => {
      const result = await Book.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            title,
            year,
          },
        }
      );
      if (result.acknowledged && result.modifiedCount === 1) {
        return await Book.findOne({ _id: id });
      }
      return null;
    },
  },
};
