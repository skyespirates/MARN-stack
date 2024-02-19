import Todo from "./Todo.js";
import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseValue(value) {
    if (typeof value === "number") {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error("GraphQL Date Scalar parser expected a `number`");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

export const typeDefs = `
    scalar Date

    type Query {
        todos: [Todo]
        todo(id: ID): Todo
    }

    type Mutation {
        todo(title: String): Todo
        updateTodo(id: ID, title: String, completed: Boolean): Todo
        deleteTodo(id: ID): Todo
    }

    type Todo {
        id: ID!
        title: String!
        completed: Boolean
        date: Date
    }
`;

export const resolvers = {
  Date: dateScalar,
  Query: {
    todos: async () => await Todo.find({}),
    todo: async (_, { id }) => await Todo.findById(id),
  },
  Mutation: {
    todo: async (_, { title }) => await Todo.create({ title }),
    updateTodo: async (_, { id, title, completed }) =>
      await Todo.findByIdAndUpdate(id, { title, completed }, { new: true }),
    deleteTodo: async (_, { id }) => await Todo.findByIdAndDelete(id),
  },
};
