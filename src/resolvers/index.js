import Mutation from "./mutation";
import Query from "./query";
import Subscription from "./subscription";
import types from "./types";
import GraphQLJSON from "graphql-type-json";

// Define resolvers.
export default {
  // All mutations.
  Mutation,

  // All queries.
  Query,

  // All subscriptions.
  Subscription,

  // JSON type.
  JSON: GraphQLJSON,

  // All custom types.
  ...types
};
