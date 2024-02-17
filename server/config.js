import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import schema from "./models/schema.js";

export const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/my_applications");
    console.log("📚 Connected to db");
  } catch (error) {
    console.log(error);
  }
};

export const apolloServer = async () => {
  try {
    const server = new ApolloServer({ schema });
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.info(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error(error);
  }
};
