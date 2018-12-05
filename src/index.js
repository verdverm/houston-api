import "@babel/polyfill";
import "dotenv/config";
import resolvers from "./resolvers";
import log from "./logger";
import config from "config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { Prisma } from "prisma-binding";
import { importSchema } from "graphql-import";
import { createServer } from "http";

// Get configuration from config dir and environment
const serverConfig = config.get("webserver");

// Create express server
const app = express();

// Instantiate a new GraphQL Apollo Server
const server = new ApolloServer({
  typeDefs: importSchema("./src/schema.graphql"),
  resolvers,
  introspection: true,
  playground: true,
  subscriptions: {
    path: serverConfig.subscriptions
  },
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: "http://localhost:4466",
      secret: "supersecret",
      debug: true
    })
  })
});

// Apply express middleware
server.applyMiddleware({ app, path: serverConfig.endpoint });

// Create HTTP server
const httpServer = createServer(app);

// Install subscriptions handlers on our server
server.installSubscriptionHandlers(httpServer);

// Start the HTTP server
httpServer.listen({ port: serverConfig.port }, () => {
  log.info(
    `Server ready at http://localhost:${serverConfig.port}${server.graphqlPath}`
  );
  log.info(
    `Subscriptions ready at ws://localhost:${serverConfig.port}${
      server.subscriptionsPath
    }`
  );
});
