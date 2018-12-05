import Mutation from "./mutation";
import types from "./types";
import GraphQLJSON from "graphql-type-json";

// Define resolvers
export default {
  Mutation,
  JSON: GraphQLJSON,
  ...types
};
