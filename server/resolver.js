import { Book } from "./models/Book.js";
import { User } from "./models/User.js";
// GraphQL Resolvers
export const resolvers = {
  Query: {
    books: async () => await Book.find({}),
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
