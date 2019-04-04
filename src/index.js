import "@babel/polyfill";
import "dotenv/config";
import resolvers from "./resolvers";
import { v1 } from "./routes";
import log from "logger";
import directives from "directives";
import { formatError } from "errors";
import commander from "commander";
import { authenticateRequest, wsOnConnect } from "authentication";
import config from "config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { Prisma } from "prisma-binding";
import { importSchema } from "graphql-import";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { PubSub } from "apollo-server";
import { createServer } from "http";

// Get configuration from config dir and environment.
const serverConfig = config.get("webserver");
const helmConfig = config.get("helm");
const prismaConfig = config.get("prisma");

// Create express server.
const app = express();
app.use(cookieParser(), authenticateRequest());

// Set up HTTP request logging.
app.use(
  morgan(process.env.NODE_ENV === "development" ? "dev" : "short", {
    stream: { write: msg => log.debug(msg.trim()) }
  })
);

// Setup REST routes.
app.use("/v1", v1);

// Instantiate a new GraphQL Apollo Server.
const server = new ApolloServer({
  typeDefs: [importSchema("./src/schema.graphql")],
  resolvers,
  schemaDirectives: {
    ...directives
  },
  introspection: true,
  playground: true,
  subscriptions: {
    path: serverConfig.subscriptions,
    onConnect: wsOnConnect
  },
  formatError,
  context: ctx => {
    const context = {
      ...ctx,
      db: new Prisma({
        typeDefs: "src/lib/generated/schema/prisma.graphql",
        endpoint: prismaConfig.endpoint,
        secret: prismaConfig.secret,
        debug: prismaConfig.debug
      }),
      pubsub: new PubSub(),
      commander
    };

    // If it's a subscription, merge the result of the onConnect function
    // into the context.
    if (ctx.connection) return { ...context, ...ctx.connection.context };

    // Otherwise return the normal context.
    return context;
  }
});

// Apply express middleware.
server.applyMiddleware({
  app,
  path: serverConfig.endpoint,
  cors: {
    origin: [
      "http://app.local.astronomer.io:5000", // Development orbit build
      "http://app.local.astronomer.io:8080", // Production orbit build
      new RegExp(":\\/\\/localhost[:\\d+]?"),
      new RegExp(`.${helmConfig.baseDomain}$`)
    ],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Content-Length",
      "X-Requested-With",
      "X-Apollo-Tracing"
    ],
    credentials: true
  }
});

// Create HTTP server.
const httpServer = createServer(app);

// Install subscriptions handlers on our server.
server.installSubscriptionHandlers(httpServer);

// Start the HTTP server.
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
