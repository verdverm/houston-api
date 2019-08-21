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

jest.mock("emails");

const query = `
  mutation removeUser($userUuid: Uuid!) {
    removeUser(userUuid: $userUuid) {
      id: uuid
    }
  }
`;

describe("removeUser", () => {
  test("removes the user role binding", async () => {
    // Create mock user.
    const userUuid = casual.uuid;

    // Mock up some db functions.
    const deleteUser = jest.fn();

    // Construct db object for context.
    const db = {
      mutation: { deleteUser }
    };

    const vars = {
      userUuid
    };

    // Run the graphql mutation.
    const res = await graphql(schema, query, null, { db }, vars);
    expect(res.errors).toBeUndefined();

    const where = { id: userUuid };
    expect(deleteUser).toHaveBeenCalledWith({ where });
  });
});
