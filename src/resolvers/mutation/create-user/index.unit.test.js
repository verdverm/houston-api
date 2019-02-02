import * as users from "users";
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
    // Mock up some functions.
    const createLocalCredential = jest.fn();
    const user = jest.fn();
    const cookie = jest.fn();

    // Construct db object for context.
    const db = {
      query: { user },
      mutation: { createLocalCredential }
    };

    // Set up our spy.
    const createUserSpy = jest
      .spyOn(users, "createUser")
      .mockReturnValue(casual.uuid);

    // Vars for the gql mutation.
    const vars = {
      email: casual.email,
      password: casual.password,
      username: casual.username
    };

    // Run the graphql mutation.
    const res = await graphql(
      schema,
      mutation,
      null,
      { db, res: { cookie } },
      vars
    );

    expect(res.errors).toBeUndefined();
    expect(createUserSpy.mock.calls).toHaveLength(1);
    expect(createLocalCredential.mock.calls).toHaveLength(1);
    expect(cookie.mock.calls).toHaveLength(1);
    expect(res.data.createUser.token.payload.iat).toBeDefined();
    expect(res.data.createUser.token.payload.exp).toBeGreaterThan(
      Math.floor(new Date() / 1000)
    );
  });
});
