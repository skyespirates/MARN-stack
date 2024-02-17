import lodash from "lodash";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs as Book, resolvers as bookResolvers } from "./Book/index.js";
import { typeDefs as User, resolvers as userResolvers } from "./User/index.js";
import {
  typeDefs as Customer,
  resolvers as customerResolvers,
} from "./Customer/index.js";

export default makeExecutableSchema({
  typeDefs: [Book, User, Customer],
  resolvers: lodash.merge(bookResolvers, userResolvers, customerResolvers),
});
