import resolvers from "resolvers";
import casual from "casual";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { importSchema } from "graphql-import";
import { WORKSPACE_ADMIN } from "constants";

// Import our application schema
const schema = makeExecutableSchema({
  typeDefs: importSchema("src/schema.graphql"),
  resolvers
});

// Define our mutation
const query = `
  mutation workspaceAddUser(
    $workspaceUuid: Uuid
    $email: String!
  ) {
    workspaceAddUser(
      workspaceUuid: $workspaceUuid
      email: $email
    ) {
      id
    }
  }
`;

describe("workspaceAddUser", () => {
  test("typical request is successful", async () => {
    // Create mock user.
    const user = {
      id: casual.uuid
    };

    // Mock up some db functions.
    const users = jest.fn().mockReturnValue([user]);
    const inviteTokens = jest.fn();
    const workspace = jest.fn();
    const createRoleBinding = jest.fn();
    const createInviteToken = jest.fn();

    // Construct db object for context.
    const db = {
      query: { users, inviteTokens, workspace },
      mutation: { createRoleBinding, createInviteToken }
    };

    const vars = {
      workspaceUuid: casual.uuid,
      email: casual.email
    };

    // Run the graphql mutation.
    const res = await graphql(schema, query, null, { db }, vars);
    expect(res.errors).toBeUndefined();
    expect(users.mock.calls).toHaveLength(1);
    expect(createRoleBinding.mock.calls).toHaveLength(1);
    expect(inviteTokens.mock.calls).toHaveLength(0);
    expect(createInviteToken.mock.calls).toHaveLength(0);
    expect(workspace.mock.calls).toHaveLength(1);
  });

  test("throws creating invite token if one already exists", async () => {
    // Mock up some db functions.
    const users = jest.fn().mockReturnValue([]);
    const inviteTokens = jest.fn().mockReturnValue({ id: casual.uuid });
    const workspace = jest.fn();
    const createRoleBinding = jest.fn();
    const createInviteToken = jest.fn();

    // Construct db object for context.
    const db = {
      query: { users, inviteTokens, workspace },
      mutation: { createRoleBinding, createInviteToken }
    };

    const vars = {
      workspaceUuid: casual.uuid,
      email: casual.email
    };

    // Run the graphql mutation.
    const res = await graphql(schema, query, null, { db }, vars);
    expect(res.errors).toHaveLength(1);
    expect(users.mock.calls).toHaveLength(1);
    expect(createRoleBinding.mock.calls).toHaveLength(0);
    expect(inviteTokens.mock.calls).toHaveLength(1);
    expect(createInviteToken.mock.calls).toHaveLength(0);
    expect(workspace.mock.calls).toHaveLength(0);
  });

  test("creates token if user does not yet exist and there is not an existing invite", async () => {
    // Mock up some db functions.
    const users = jest.fn().mockReturnValue([]);
    const inviteTokens = jest.fn().mockReturnValue();
    const workspace = jest.fn();
    const createRoleBinding = jest.fn();
    const createInviteToken = jest.fn();

    // Construct db object for context.
    const db = {
      query: { users, inviteTokens, workspace },
      mutation: { createRoleBinding, createInviteToken }
    };

    const vars = {
      workspaceUuid: casual.uuid,
      email: casual.email
    };

    // Run the graphql mutation.
    const res = await graphql(schema, query, null, { db }, vars);
    expect(res.errors).toBeUndefined();
    expect(users.mock.calls).toHaveLength(1);
    expect(createRoleBinding.mock.calls).toHaveLength(0);
    expect(inviteTokens.mock.calls).toHaveLength(1);
    expect(createInviteToken.mock.calls).toHaveLength(1);
    expect(workspace.mock.calls).toHaveLength(1);
  });
});
