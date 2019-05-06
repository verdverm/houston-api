import { deploymentsQuery } from "./index";
import resolvers from "resolvers";
import casual from "casual";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { importSchema } from "graphql-import";

import {
  DEPLOYMENT_VIEWER,
  DEPLOYMENT_EDITOR,
  WORKSPACE_EDITOR,
  WORKSPACE_VIEWER
} from "constants";

// Import our application schema
const schema = makeExecutableSchema({
  typeDefs: importSchema("src/schema.graphql"),
  resolvers
});

// Define our mutation
const query = `
  query deployments {
    deployments {
      id
      label
      description
      type
      releaseName
      version
      workspace {
        id: uuid
      }
      urls {
        type
        url
      }
      createdAt
      updatedAt
      config
      env
      properties
    }
  }
`;

describe("deployments", () => {
  test("typical request is successful", async () => {
    const user = {
      id: casual.uuid,
      roleBindings: [{ deployment: { id: casual.uuid } }]
    };

    // Mock up some db functions.
    const deployments = jest.fn();

    // Construct db object for context.
    const db = {
      query: {
        deployments
      }
    };

    // Run the graphql mutation.
    const res = await graphql(schema, query, null, { db, user });
    expect(res.errors).toBeUndefined();
    expect(deployments.mock.calls.length).toBe(1);
  });
});

describe("deploymentsQuery", () => {
  test("deploymentId is correctly used in query", async () => {
    const deploymentId = casual.uuid;

    const args = {
      deploymentUuid: deploymentId
    };

    const user = {
      id: casual.uuid
    };

    // Build context.
    const ctx = { user };

    // Get the query.
    const query = deploymentsQuery(args, ctx);

    expect(query).toHaveProperty("where.AND");
    expect(query.where.AND).toHaveLength(1);
    expect(query.where.AND[0]).toHaveProperty("id", deploymentId);
  });

  test("workspaceId is correctly used in query", async () => {
    const workspaceId = casual.uuid;

    const args = {
      workspaceUuid: workspaceId
    };

    const user = {
      id: casual.uuid
    };

    // Build context.
    const ctx = { user };

    // Get the query.
    const query = deploymentsQuery(args, ctx);

    expect(query).toHaveProperty("where.AND");
    expect(query.where.AND).toHaveLength(1);
    expect(query.where.AND[0]).toHaveProperty("workspace.id", workspaceId);
  });

  test("correctly falls back if no arguments are provided", async () => {
    const deploymentId1 = casual.uuid;
    const deploymentId2 = casual.uuid;
    const deploymentId3 = casual.uuid;

    const args = {};

    const user = {
      id: casual.uuid,
      roleBindings: [
        {
          deployment: { id: deploymentId1 },
          role: DEPLOYMENT_VIEWER
        },
        {
          deployment: { id: deploymentId2 },
          role: DEPLOYMENT_EDITOR
        },
        {
          deployment: { id: deploymentId3 },
          role: "FAKE_ROLE"
        }
      ]
    };

    // Build context.
    const ctx = { user };

    // Run the graphql mutation.
    const query = deploymentsQuery(args, ctx);

    expect(query).toHaveProperty("where.AND");
    expect(query.where.AND).toHaveLength(1);
    expect(query.where.AND[0]).toHaveProperty("id_in", [
      deploymentId1,
      deploymentId2
    ]);
  });

  test("includes workspaces and deployments when no args provided", async () => {
    const deploymentId1 = casual.uuid;
    const deploymentId2 = casual.uuid;
    const deploymentId3 = casual.uuid;
    const workspaceId1 = casual.uuid;
    const workspaceId2 = casual.uuid;
    const workspaceId3 = casual.uuid;

    const args = {};

    const user = {
      id: casual.uuid,
      roleBindings: [
        {
          deployment: { id: deploymentId1 },
          role: DEPLOYMENT_VIEWER
        },
        {
          deployment: { id: deploymentId2 },
          role: DEPLOYMENT_EDITOR
        },
        {
          deployment: { id: deploymentId3 },
          role: "FAKE_ROLE"
        },
        {
          workspace: { id: workspaceId1 },
          role: WORKSPACE_EDITOR
        },
        {
          workspace: { id: workspaceId2 },
          role: WORKSPACE_EDITOR
        },
        {
          workspace: { id: workspaceId },
          role: WORKSPACE_VIEWER
        }
      ]
    };

    // Build context.
    const ctx = { user };

    // Run the graphql mutation.
    const query = deploymentsQuery(args, ctx);

    expect(query).toHaveProperty("where.OR");
    expect(query.where.OR).toHaveLength(3);
    expect(query.where).toHaveProperty("OR.0.id_in", [
      deploymentId1,
      deploymentId2
    ]);
    expect(query.where).toHaveProperty("OR.1", {
      workspace: { id: workspaceId1 }
    });
    expect(query.where).toHaveProperty("OR.2", {
      workspace: { id: workspaceId2 }
    });
  });

  test("includes workspaces when no args provided", async () => {
    const deploymentId1 = casual.uuid;
    const workspaceId1 = casual.uuid;
    const workspaceId2 = casual.uuid;
    const workspaceId3 = casual.uuid;

    const args = {};

    const user = {
      id: casual.uuid,
      roleBindings: [
        {
          deployment: { id: deploymentId1 },
          role: "FAKE_ROLE"
        },
        {
          workspace: { id: workspaceId1 },
          role: WORKSPACE_EDITOR
        },
        {
          workspace: { id: workspaceId2 },
          role: WORKSPACE_EDITOR
        },
        {
          workspace: { id: workspaceId3 },
          role: WORKSPACE_VIEWER
        }
      ]
    };

    // Build context.
    const ctx = { user };

    // Run the graphql mutation.
    const query = deploymentsQuery(args, ctx);

    expect(query).toHaveProperty("where.OR");
    expect(query.where.OR).toHaveLength(2);
    expect(query.where).toHaveProperty("OR.0", {
      workspace: { id: workspaceId1 }
    });
    expect(query.where).toHaveProperty("OR.1", {
      workspace: { id: workspaceId2 }
    });
  });
});
