import "@babel/polyfill";
import "dotenv/config";
import log from "logger";
import resolvers from "resolvers";
import directives from "directives";
import { v1 } from "routes";
import cors from "cors";
import config from "config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { Prisma } from "prisma-binding";
import { importSchema } from "graphql-import";
import { createServer } from "http";

// Get configuration from config dir and environment
const serverConfig = config.get("webserver");
const helmConfig = config.get("helm");

// Create express server
const app = express();

// Configure cors express middleware
app.use(
  cors({
    origin: [
      "http://app.local.astronomer.io:5000",
      new RegExp(":\\/\\/localhost[:\\d+]?"),
      new RegExp(`.${helmConfig.baseDomain}$`)
    ],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Content-Length",
      "X-Requested-With"
    ],
    credentials: true
  })
);

// Configure JSON parsing express middleware
app.use(
  express.json({
    type: [
      "application/json",
      "application/vnd.docker.distribution.events.v1+json"
    ]
  })
);

// Configure url encoding express middleware
app.use(express.urlencoded({ extended: false }));

// Setup REST routes
app.use("/v1", v1);

// Instantiate a new GraphQL Apollo Server
const server = new ApolloServer({
  typeDefs: importSchema("./src/schema.graphql"),
  resolvers,
  schemaDirectives: {
    ...directives
  },
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
      debug: serverConfig.debug
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
