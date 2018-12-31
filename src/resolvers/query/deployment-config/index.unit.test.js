import { mapResources } from "./index";
import resolvers from "resolvers";
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
  query deploymentConfig(
    $workspaceUuid: Uuid
    $deploymentUuid: Uuid
    $type: String
    $version: String
  ) {
    deploymentConfig(
      workspaceUuid: $workspaceUuid
      deploymentUuid: $deploymentUuid
      type: $type
      version: $version
    ) {
      defaults
      limits
      astroUnit {
        cpu
        memory
        pods
        airflowConns
        actualConns
        price
      }
      maxExtraAu
      executors
      latestVersion
    }
  }
`;

describe("deploymentConfig", () => {
  test("typical request is successful", async () => {
    // Run the graphql mutation.
    const { data, errors } = await graphql(schema, query);
    expect(errors).toBeUndefined();
    expect(data.deploymentConfig).toHaveProperty("defaults");
    expect(data.deploymentConfig).toHaveProperty("limits");
    expect(data.deploymentConfig).toHaveProperty("astroUnit");
    expect(data.deploymentConfig).toHaveProperty("maxExtraAu");
    expect(data.deploymentConfig).toHaveProperty("executors");
    expect(data.deploymentConfig).toHaveProperty("latestVersion");
  });

  test("mapResources correctly maps values", () => {
    const au = {
      cpu: 100,
      memory: 384
    };

    const auType = "default";

    const comp = {
      name: "scheduler",
      au: {
        default: 5,
        limit: 10
      }
    };

    const res = mapResources(au, auType, comp);
    expect(res).toHaveProperty("scheduler.requests.cpu");
    expect(res.scheduler.requests.cpu).toBe(500);

    expect(res).toHaveProperty("scheduler.requests.memory");
    expect(res.scheduler.requests.memory).toBe(1920);
  });

  test("mapResources correctly maps values with extras", () => {
    const au = {
      cpu: 100,
      memory: 384
    };

    const auType = "default";

    const comp = {
      name: "webserver",
      au: {
        default: 5,
        limit: 10
      },
      extra: [
        {
          name: "replicas",
          default: 1,
          limit: 10
        }
      ]
    };

    const res = mapResources(au, auType, comp);
    expect(res).toHaveProperty("webserver.replicas");
    expect(res.webserver.replicas).toBe(1);
  });
});
