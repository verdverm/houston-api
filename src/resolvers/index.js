import Query from "./query";
import Mutation from "./mutation";
import types from "./types";
import GraphQLJSON from "graphql-type-json";

// Define resolvers.
export default {
  // All Queries.
  Query,

  // All mutations.
  Mutation,

  // JSON type.
  JSON: GraphQLJSON,

  // All custom types.
  ...types
};
