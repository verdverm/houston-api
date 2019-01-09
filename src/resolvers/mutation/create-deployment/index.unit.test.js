import { DuplicateDeploymentLabelError } from "errors";
import resolvers from "resolvers";
import * as validate from "deployments/validate";
import { generateReleaseName } from "deployments/naming";
import casual from "casual";
import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { importSchema } from "graphql-import";
import {
  AIRFLOW_EXECUTOR_CELERY,
  DEPLOYMENT_AIRFLOW,
  DEPLOYMENT_PROPERTY_COMPONENT_VERSION,
  DEPLOYMENT_PROPERTY_ALERT_EMAILS,
  DEPLOYMENT_PROPERTY_EXTRA_AU
} from "constants";

// Import our application schema
const schema = makeExecutableSchema({
  typeDefs: importSchema("src/schema.graphql"),
  resolvers
});

// Define our mutation
const mutation = `
  mutation createDeployment(
    $workspaceUuid: Uuid!
    $type: String!
    $label: String!
    $description: String
    $version: String
    $config: JSON
    $env: JSON
    $properties: JSON
  ) {
    createDeployment(
      workspaceUuid: $workspaceUuid
      type: $type
      label: $label
      description: $description
      version: $version
      config: $config
      env: $env
      properties: $properties
    ) {
        id
        config
        env
        urls {
          type
          url
        }
        properties
        description
        label
        releaseName
        status
        type
        version
        workspace {
          id
        }
        createdAt
        updatedAt
      }
    }
`;

describe("createDeployment", () => {
  test("typical request is successful", async () => {
    // Create mock user.
    const user = {
      id: casual.uuid
    };

    // Create some deployment vars.
    const id = casual.uuid;

    // Mock up some db functions.
    const createDeployment = jest.fn().mockReturnValue({
      id,
      releaseName: generateReleaseName(),
      config: { executor: AIRFLOW_EXECUTOR_CELERY },
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const createRoleBinding = jest.fn().mockReturnValue({
      id: casual.uuid
    });

    const deploymentExists = jest.fn().mockReturnValue(false);

    // Construct db object for context.
    const db = {
      mutation: { createDeployment, createRoleBinding },
      exists: { Deployment: deploymentExists }
    };

    // Create mock commander client.
    const commander = {
      request: jest.fn()
    };

    // Vars for the gql mutation.
    const vars = {
      workspaceUuid: casual.uuid,
      type: DEPLOYMENT_AIRFLOW,
      label: casual.word,
      properties: {
        [DEPLOYMENT_PROPERTY_EXTRA_AU]: casual.integer(0, 300),
        [DEPLOYMENT_PROPERTY_ALERT_EMAILS]: [casual.email],
        [DEPLOYMENT_PROPERTY_COMPONENT_VERSION]: "7.0"
      }
    };

    // Run the graphql mutation.
    const res = await graphql(
      schema,
      mutation,
      null,
      { db, commander, user },
      vars
    );

    expect(res.errors).toBeUndefined();
    expect(createDeployment.mock.calls.length).toBe(1);
    expect(res.data.createDeployment.id).toBe(id);
  });

  test("request fails if deployment with same label exists", async () => {
    const createDeployment = jest.fn();

    // Set up our spy.
    jest
      .spyOn(validate, "default")
      .mockImplementation(() => throw new DuplicateDeploymentLabelError());

    // Construct db object for context.
    const db = {
      mutation: { createDeployment }
    };

    // Vars for the gql mutation.
    const vars = {
      workspaceUuid: casual.uuid,
      type: DEPLOYMENT_AIRFLOW,
      label: casual.word
    };

    // Run the graphql mutation.
    const res = await graphql(schema, mutation, null, { db }, vars);

    expect(res.errors.length).toBe(1);
    expect(res.errors[0].message).toEqual(
      expect.stringMatching(/^Workspace already has a deployment named/)
    );
    expect(createDeployment).toHaveBeenCalledTimes(0);
  });
});
