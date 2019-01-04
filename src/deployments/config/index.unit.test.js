import {
  mapResources,
  transformEnvironmentVariables,
  generateHelmValues
} from "./index";
import { generateReleaseName } from "deployments/naming";
import casual from "casual";

describe("mapResources", () => {
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
    expect(res).toHaveProperty("scheduler.resources.requests.cpu");
    expect(res.scheduler.resources.requests.cpu).toBe("500m");

    expect(res).toHaveProperty("scheduler.resources.requests.memory");
    expect(res.scheduler.resources.requests.memory).toBe("1920Mi");
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

describe("transformEnvironmentVariables", () => {
  test("correctly transforms array to object", () => {
    // Create a test array.
    const arr = [
      { key: "AIRFLOW_HOME", value: "/tmp" },
      { key: "SCHEDULER_HEARTBEAT", value: "5" }
    ];

    // Run the transformation.
    const obj = transformEnvironmentVariables(arr);

    // Test for object keys and values.
    expect(obj).toHaveProperty("AIRFLOW_HOME", "/tmp");
    expect(obj).toHaveProperty("SCHEDULER_HEARTBEAT", "5");
  });
});

describe("generateHelmValues", () => {
  test("works", () => {
    const deployment = {
      id: casual.uuid,
      releaseName: generateReleaseName()
    };
    const config = generateHelmValues(deployment);
    console.log(config);
  });
});
