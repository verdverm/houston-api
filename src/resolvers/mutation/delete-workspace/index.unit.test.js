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
const mutation = `
  mutation deleteWorkspace(
    $workspaceUuid: Uuid!
  ) {
    deleteWorkspace(
      workspaceUuid: $workspaceUuid
    ) {
        id
    }
  }
`;

describe("deleteWorkspace", () => {
  test("typical request is successful", async () => {
    // Create some deployment vars.
    const id = casual.uuid;

    // Mock up some db functions.
    const deleteWorkspace = jest.fn().mockReturnValue({ id });

    // Construct db object for context.
    const db = {
      mutation: { deleteWorkspace }
    };

    // Vars for the gql mutation.
    const vars = {
      workspaceUuid: id
    };

    // Run the graphql mutation.
    const res = await graphql(schema, mutation, null, { db }, vars);

    expect(res.errors).toBeUndefined();
    expect(deleteWorkspace.mock.calls.length).toBe(1);
    expect(res.data.deleteWorkspace.id).toBe(id);
  });
});
