import resolvers from "resolvers";
import casual from "casual";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { importSchema } from "graphql-import";
import { ENTITY_WORKSPACE, WORKSPACE_ADMIN } from "constants";

// Import our application schema
const schema = makeExecutableSchema({
  typeDefs: importSchema("src/schema.graphql"),
  resolvers
});

// Define our mutation
const mutation = `
  mutation createServiceAccount(
    $label: String!,
    $category: String,
    $entityType: EntityType!,
    $entityUuid: Uuid
  ) {
    createServiceAccount(
      label: $label,
      category: $category,
      entityType: $entityType,
      entityUuid: $entityUuid
    ) {
      id
      label
      apiKey
      entityType
      entityUuid
      category
      active
      lastUsedAt
      createdAt
      updatedAt
    }
  }
`;

describe("createServiceAccount", () => {
  const workspaceId = casual.uuid;

  // Create mock user.
  const user = {
    id: casual.uuid,
    username: casual.email,
    roleBindings: [
      {
        role: WORKSPACE_ADMIN,
        workspace: { id: workspaceId, __typename: "Workspace" }
      }
    ]
  };

  // Create mock function.
  const createServiceAccount = jest.fn();

  // Construct db object for context.
  const db = {
    mutation: { createServiceAccount },
    query: {
      workspace: jest.fn()
    }
  };
  test("typical request is successful", async () => {
    // Create variables.
    const vars = {
      label: casual.word,
      category: casual.word,
      entityType: ENTITY_WORKSPACE,
      entityUuid: workspaceId
    };
    db.query.workspace.mockReturnValueOnce(user.roleBindings[0].workspace);

    // Run the graphql mutation.
    const res = await graphql(schema, mutation, null, { db, user }, vars);

    expect(res.errors).toBeUndefined();
    expect(createServiceAccount.mock.calls).toHaveLength(1);
  });

  test("error is thrown if passing entityUuid and does not have access", async () => {
    db.query.workspace.mockReturnValueOnce(null);
    // Create variables.
    const vars = {
      label: casual.word,
      category: casual.word,
      entityType: ENTITY_WORKSPACE,
      entityUuid: casual.uuid
    };

    // Run the graphql mutation.
    const res = await graphql(schema, mutation, null, { db, user }, vars);

    expect(res.errors).toHaveLength(1);
    expect(res.errors[0].message).toEqual(
      expect.stringMatching(/^You do not have the appropriate permissions/)
    );
    expect(createServiceAccount.mock.calls).toHaveLength(0);
  });
});
