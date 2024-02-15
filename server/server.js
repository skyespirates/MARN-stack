import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/my_applications")
  .then(() => {
    console.log("📚 Connected to db");
  })
  .catch((err) => console.error(err));

import { typeDefs } from "./models/typeDefs.js";
import { resolvers } from "./resolver.js";

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.info(`🚀 Server ready at ${url}`);
