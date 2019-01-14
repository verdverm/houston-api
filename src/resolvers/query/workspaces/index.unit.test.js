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
  query workspaces {
    workspaces {
      users {
        id
      }
    }
  }
`;

describe("workspaces", () => {
  test("typical request is successful", async () => {
    // Const password = casual.password;
    // const hash = await bcrypt.hash(password, 10);
    const usr = {
      id: casual.uuid,
      roleBindings: [{ workspace: { id: casual.uuid } }]
    };

    // Mock up some db functions.
    const workspaces = jest.fn().mockReturnValue([]);

    // Construct db object for context.
    const db = {
      query: {
        workspaces
      }
    };

    // Run the graphql mutation.
    const res = await graphql(schema, query, null, { db, user: usr });
    expect(res.errors).toBeUndefined();
    expect(workspaces.mock.calls.length).toBe(1);
  });
});
