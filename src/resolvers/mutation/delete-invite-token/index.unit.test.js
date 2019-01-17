import resolvers from "resolvers";
import casual from "casual";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { importSchema } from "graphql-import";

// Import our application schema
const schema = makeExecutableSchema({
  typeDefs: importSchema("src/schema.graphql"),
  resolvers
});

// Define our mutation
const query = `
  mutation deleteInviteToken(
    $inviteUuid: Uuid
  ) {
    deleteInviteToken(
      inviteUuid: $inviteUuid
    ) {
      id
    }
  }
`;

describe("deleteInviteToken", () => {
  test("typical request is successful", async () => {
    // Mock up some db functions.
    const deleteInviteToken = jest.fn();

    // Construct db object for context.
    const db = {
      mutation: {
        deleteInviteToken
      }
    };

    const vars = {
      inviteUuid: casual.uuid
    };

    // Run the graphql mutation.
    const res = await graphql(schema, query, null, { db }, vars);
    expect(res.errors).toBeUndefined();
    expect(deleteInviteToken.mock.calls.length).toBe(1);
  });
});
