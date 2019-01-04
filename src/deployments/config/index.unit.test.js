import {
  mapResources,
  transformEnvironmentVariables,
  generateHelmValues,
  limitRange,
  constraints
} from "./index";
import { generateReleaseName } from "deployments/naming";
import casual from "casual";

describe("generateHelmValues", () => {
  test("generates correct values with default/missing deployment config", () => {
    const deployment = {
      id: casual.uuid,
      releaseName: generateReleaseName()
    };
    const config = generateHelmValues(deployment);
    console.log(config);
  });
});

describe("limitRange", () => {
  test("generates correct values", () => {
    const config = limitRange();
    expect(config).toHaveProperty("limits");
    expect(config.limits).toHaveLength(2);
  });
});

describe.only("constraints", () => {
  test("correctly applies constraints for missing/default config", () => {
    const deployment = {
      id: casual.uuid,
      releaseName: generateReleaseName()
    };
    const config = constraints(deployment);
    expect(config.quotas.pods).toBe(14); // Default celery (7 pods), doubled.
    expect(config.quotas.requests.cpu).toBe("5400m"); // 2.5 doubled + 2 sidecar doubled
    expect(config.quotas.requests.memory).toBe("20736Mi"); // 9600 doubled + 768 doubled
    expect(config.quotas.requests.cpu).toBe(config.quotas.requests.cpu);
    expect(config.quotas.requests.memory).toBe(config.quotas.requests.memory);
    expect(config.pgbouncer.metadataPoolSize).toBe(12);
    expect(config.pgbouncer.maxClientConn).toBe(125);
    expect(config).not.toHaveProperty("allowPodLaunching");
  });
});

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
