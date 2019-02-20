import resolvers from "resolvers";
import casual from "casual";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { importSchema } from "graphql-import";
import { SYSTEM_ADMIN } from "constants";

// Import our application schema
const schema = makeExecutableSchema({
  typeDefs: importSchema("src/schema.graphql"),
  resolvers
});

// Define our mutation
const query = `
  mutation createSystemRoleBinding(
    $userId: ID!
    $role: Role!
  ) {
    createSystemRoleBinding(
      userId: $userId
      role: $role
    ) {
      id
    }
  }
`;

describe("createSystemRoleBinding", () => {
  test("correctly creates a system role binding", async () => {
    // Mock up some db functions.
    const RoleBinding = jest.fn();
    const createRoleBinding = jest.fn();

    // Construct db object for context.
    const db = {
      exists: { RoleBinding },
      mutation: { createRoleBinding }
    };

    const vars = {
      userId: casual.uuid,
      role: SYSTEM_ADMIN
    };

    // Run the graphql mutation.
    const res = await graphql(schema, query, null, { db }, vars);
    expect(res.errors).toBeUndefined();
  });

  test("throws error if role binding exists", async () => {
    // Mock up some db functions.
    const RoleBinding = jest.fn().mockReturnValue(true);
    const createRoleBinding = jest.fn();

    // Construct db object for context.
    const db = {
      exists: { RoleBinding },
      mutation: { createRoleBinding }
    };

    const vars = {
      userId: casual.uuid,
      role: "BAD_ROLE"
    };

    // Run the graphql mutation.
    const res = await graphql(schema, query, null, { db }, vars);
    expect(res.errors).toHaveLength(1);
  });
});
