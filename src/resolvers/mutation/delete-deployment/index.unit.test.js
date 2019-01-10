import resolvers from "resolvers";
import { generateReleaseName } from "deployments/naming";
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
  mutation deleteDeployment(
    $deploymentUuid: Uuid!
  ) {
    deleteDeployment(
      deploymentUuid: $deploymentUuid
    ) {
        id
    }
  }
`;

describe("deleteDeployment", () => {
  test("typical request is successful", async () => {
    // Create some deployment vars.
    const id = casual.uuid;

    // Mock up some db functions.
    const deleteDeployment = jest.fn().mockReturnValue({
      id,
      releaseName: generateReleaseName()
    });

    // Construct db object for context.
    const db = {
      mutation: { deleteDeployment }
    };

    // Create mock commander client.
    const commander = {
      request: jest.fn()
    };

    // Vars for the gql mutation.
    const vars = {
      deploymentUuid: id
    };

    // Run the graphql mutation.
    const res = await graphql(schema, mutation, null, { db, commander }, vars);

    expect(res.errors).toBeUndefined();
    expect(deleteDeployment.mock.calls.length).toBe(1);
    expect(commander.request.mock.calls.length).toBe(1);
    expect(res.data.deleteDeployment.id).toBe(id);
  });
});
