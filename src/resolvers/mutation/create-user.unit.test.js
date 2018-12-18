import {
  defaultWorkspaceLabel,
  defaultWorkspaceDescription
} from "./create-user";
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
  mutation createUser(
    $email: String!
    $password: String!
    $username: String!
    $inviteToken: String
  ) {
    createUser(
      email: $email,
      password: $password,
      username: $username,
      inviteToken: $inviteToken
    ) {
      user {
        id
        username
      }
      token {
        value
        payload {
          uuid
          iat
          exp
        }
      }
    }
  }
`;

describe("createUser", () => {
  test("typical request is successful", async () => {
    // Mock up some db functions.
    const usersConnection = jest
      .fn()
      .mockReturnValue({ aggregate: { count: 0 } });
    const createUser = jest.fn().mockReturnValue({ id: casual.uuid });

    // Construct db object for context.
    const db = {
      query: { usersConnection },
      mutation: { createUser }
    };

    // Vars for the gql mutation.
    const vars = {
      email: casual.email,
      password: casual.password,
      username: casual.username
    };

    // Run the graphql mutation.
    const res = await graphql(schema, mutation, null, { db }, vars);

    expect(usersConnection.mock.calls.length).toBe(1);
    expect(createUser.mock.calls.length).toBe(1);
    expect(res.data.createUser.token.payload.iat).toBe(
      Math.floor(new Date() / 1000)
    );
    expect(res.data.createUser.token.payload.exp).toBeGreaterThan(
      Math.floor(new Date() / 1000)
    );
  });

  test("throws error if not first signup and public signups disabled", async () => {
    // Mock up some db functions.
    const usersConnection = jest
      .fn()
      .mockReturnValue({ aggregate: { count: 1 } });
    const createUser = jest.fn().mockReturnValue({ id: casual.uuid });

    // Construct db object for context.
    const db = {
      query: { usersConnection },
      mutation: { createUser }
    };

    // Vars for the gql mutation.
    const vars = {
      email: casual.email,
      password: casual.password,
      username: casual.username
    };

    // Run the graphql mutation.
    const res = await graphql(schema, mutation, null, { db }, vars);
    expect(res.errors.length).toBe(1);
    expect(res.errors[0].message).toEqual(
      expect.stringMatching(/^Public signups are disabled/)
    );
    expect(createUser).toHaveBeenCalledTimes(0);
  });

  test("throws error if invite token isn't found in database", async () => {
    // Mock up some db functions.
    const usersConnection = jest
      .fn()
      .mockReturnValue({ aggregate: { count: 1 } });
    const createUser = jest.fn().mockReturnValue({ id: casual.uuid });
    const inviteTokensConnection = jest.fn().mockReturnValue(null);

    // Construct db object for context.
    const db = {
      query: { usersConnection, inviteTokensConnection },
      mutation: { createUser }
    };

    // Vars for the gql mutation.
    const vars = {
      email: casual.email,
      password: casual.password,
      username: casual.username,
      inviteToken: casual.uuid
    };

    // Run the graphql mutation.
    const res = await graphql(schema, mutation, null, { db }, vars);
    expect(res.errors.length).toBe(1);
    expect(res.errors[0].message).toEqual(
      expect.stringMatching(/^Invite token not found/)
    );
    expect(createUser).toHaveBeenCalledTimes(0);
  });
});

describe("defaultWorkspaceLabel", () => {
  test("generates workspace label with full name", () => {
    const args = { profile: { fullName: "Elon Musk" }, username: "elon1" };
    const res = defaultWorkspaceLabel(args);
    expect(res).toBe("Elon Musk's Workspace");
  });

  test("generates workspace label with username", () => {
    const args = { username: "elon1" };
    const res = defaultWorkspaceLabel(args);
    expect(res).toBe("elon1's Workspace");
  });

  test("generates workspace label no user information", () => {
    const args = {};
    const res = defaultWorkspaceLabel(args);
    expect(res).toBe("Default Workspace");
  });
});

describe("defaultWorkspaceDescription", () => {
  test("generates workspace description with full name", () => {
    const args = { profile: { fullName: "Elon Musk" }, username: "elon1" };
    const res = defaultWorkspaceDescription(args);
    expect(res).toBe("Default workspace for Elon Musk");
  });

  test("generates workspace description with email", () => {
    const args = { username: "elon1" };
    const res = defaultWorkspaceDescription(args);
    expect(res).toBe("Default workspace for elon1");
  });

  test("generates workspace description with username", () => {
    const args = { email: "elon1@gmail.com" };
    const res = defaultWorkspaceDescription(args);
    expect(res).toBe("Default workspace for elon1@gmail.com");
  });

  test("generates workspace description no user information", () => {
    const args = {};
    const res = defaultWorkspaceDescription(args);
    expect(res).toBe("Default Workspace");
  });
});
