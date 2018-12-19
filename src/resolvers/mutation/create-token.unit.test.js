import resolvers from "resolvers";
import bcrypt from "bcryptjs";
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
  mutation createToken(
    $identity: String!
    $password: String!
  ) {
    createToken(
      identity: $identity,
      password: $password
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

describe("createToken", () => {
  test("typical request is successful", async () => {
    const password = casual.password;
    const hash = await bcrypt.hash(password, 10);
    const usr = { id: 0, status: "", localCredential: { password: hash } };

    // Mock up some db functions.
    const users = jest.fn().mockReturnValue([usr]);
    const user = jest.fn().mockReturnValue(usr);
    const cookie = jest.fn();

    // Construct db object for context.
    const db = {
      query: { user, users }
    };

    // Vars for the gql mutation.
    const vars = {
      identity: casual.email,
      password
    };

    // Run the graphql mutation.
    const res = await graphql(
      schema,
      mutation,
      null,
      { db, res: { cookie } },
      vars
    );

    expect(users.mock.calls.length).toBe(1);
    expect(cookie.mock.calls.length).toBe(1);
    expect(res.data.createToken.token.payload.iat).toBe(
      Math.floor(new Date() / 1000)
    );
    expect(res.data.createToken.token.payload.exp).toBeGreaterThan(
      Math.floor(new Date() / 1000)
    );
  });

  test("throws error if user not found", async () => {
    // Mock up some db functions.
    const users = jest.fn().mockReturnValue([]);

    // Construct db object for context.
    const db = {
      query: { users }
    };

    // Vars for the gql mutation.
    const vars = {
      identity: casual.email,
      password: casual.password
    };

    // Run the graphql mutation.
    const res = await graphql(schema, mutation, null, { db }, vars);
    expect(res.errors.length).toBe(1);
    expect(res.errors[0].message).toEqual(
      expect.stringMatching(/^The requested resource was not found/)
    );
  });

  test("throws error if no credentials are found", async () => {
    // Mock user
    const usr = { id: 0, status: "" };

    // Mock up some db functions.
    const users = jest.fn().mockReturnValue([usr]);

    // Construct db object for context.
    const db = {
      query: { users }
    };

    // Vars for the gql mutation.
    const vars = {
      identity: casual.email,
      password: casual.password
    };

    // Run the graphql mutation.
    const res = await graphql(schema, mutation, null, { db }, vars);
    expect(res.errors.length).toBe(1);
    expect(res.errors[0].message).toEqual(
      expect.stringMatching(/^Credentials not found/)
    );
  });

  test("throws error if credentials are invalid", async () => {
    // Mock user
    const usr = { id: 0, status: "", localCredential: { password: "wrong" } };

    // Mock up some db functions.
    const users = jest.fn().mockReturnValue([usr]);

    // Construct db object for context.
    const db = {
      query: { users }
    };

    // Vars for the gql mutation.
    const vars = {
      identity: casual.email,
      password: casual.password
    };

    // Run the graphql mutation.
    const res = await graphql(schema, mutation, null, { db }, vars);
    expect(res.errors.length).toBe(1);
    expect(res.errors[0].message).toEqual(
      expect.stringMatching(/^Invalid username and password/)
    );
  });
});
