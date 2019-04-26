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
const query = `
  query serviceAccounts(
    $serviceAccountUuid: Uuid
    $entityType: EntityType!
    $entityUuid: Uuid
  ) {
    serviceAccounts(
      serviceAccountUuid: $serviceAccountUuid
      entityType: $entityType
      entityUuid: $entityUuid
    ) {
      id
      label
      apiKey
      entityType
      entityId: entityUuid
      category
      active
      lastUsedAt
      createdAt
      updatedAt
    }
  }
`;

describe("serviceAccounts", () => {
  test("typical request is successful", async () => {
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

    // Mock up some db functions.
    const serviceAccounts = jest.fn();

    // Construct db object for context.
    const db = {
      query: {
        serviceAccounts,
        workspace: jest.fn().mockReturnValue(user.roleBindings[0].workspace)
      }
    };

    const vars = {
      entityType: ENTITY_WORKSPACE,
      entityUuid: workspaceId
    };

    // Run the graphql mutation.
    const res = await graphql(schema, query, null, { db, user }, vars);
    expect(res.errors).toBeUndefined();
    expect(serviceAccounts.mock.calls.length).toBe(1);
  });

  test("request fails if missing an argument", async () => {
    const vars = {
      entityType: ENTITY_WORKSPACE
    };

    // Run the graphql mutation.
    const res = await graphql(schema, query, null, {}, vars);
    expect(res.errors).toHaveLength(1);
    expect(res.errors[0].message).toEqual(
      expect.stringMatching(/^A required argument was not sent/)
    );
  });

  test("request fails if user does not have access to entityUuid", async () => {
    // Create mock user.
    const user = {
      id: casual.uuid,
      username: casual.email,
      roleBindings: [
        {
          role: WORKSPACE_ADMIN,
          workspace: { id: casual.uuid, __typename: "Workspace" }
        }
      ]
    };

    const db = { query: { workspace: jest.fn() } };

    const vars = {
      entityType: ENTITY_WORKSPACE,
      entityUuid: casual.uuid
    };

    // Run the graphql mutation.
    const res = await graphql(schema, query, null, { user, db }, vars);
    expect(res.errors).toHaveLength(1);
    expect(res.errors[0].message).toEqual(
      expect.stringMatching(/^You do not have the appropriate permissions/)
    );
  });
});
