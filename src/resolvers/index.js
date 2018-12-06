import Mutation from "./mutation";
import types from "./types";
import GraphQLJSON from "graphql-type-json";

// Define resolvers.
export default {
  // All mutations.
  Mutation,

  // All custom types.
  ...types,

  // JSON type.
  JSON: GraphQLJSON,

  // Prevent warning from apollo-server when using prisma.
  // https://github.com/apollographql/apollo-server/issues/1075
  Node: {
    __resolveType() {
      null;
    }
  }
};
