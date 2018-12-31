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
  query self {
    self {
      user {
        id
      }
    }
  }
`;

describe("authConfig", () => {
  test("typical request is successful", async () => {
    // Const password = casual.password;
    // const hash = await bcrypt.hash(password, 10);
    const usr = { id: casual.uuid };

    // Mock up some db functions.
    // const users = jest.fn().mockReturnValue([usr]);
    const user = jest.fn().mockReturnValue(usr);

    // Construct db object for context.
    const db = {
      query: {
        user
      }
    };

    // Run the graphql mutation.
    const res = await graphql(schema, query, null, { db, user: usr });
    expect(res.errors).toBeUndefined();
    expect(user.mock.calls.length).toBe(1);
  });
});
