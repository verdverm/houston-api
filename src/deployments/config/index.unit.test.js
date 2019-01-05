import {
  mapResources,
  transformEnvironmentVariables,
  generateHelmValues,
  limitRange,
  constraints
} from "./index";
import { generateReleaseName } from "deployments/naming";
import casual from "casual";
import {
  AIRFLOW_EXECUTOR_LOCAL,
  DEPLOYMENT_PROPERTY_EXTRA_AU
} from "constants";

describe("generateHelmValues", () => {
  test("generates correct shape with default/missing deployment config", () => {
    const deployment = {
      id: casual.uuid,
      releaseName: generateReleaseName()
    };
    const config = generateHelmValues(deployment);
    expect(config).toHaveProperty("ingress");
    expect(config).toHaveProperty("networkPolicies");
    expect(config).toHaveProperty("scheduler.resources.requests");
    expect(config).toHaveProperty("scheduler.resources.limits");
    expect(config).toHaveProperty("webserver.resources.requests");
    expect(config).toHaveProperty("webserver.resources.limits");
    expect(config).toHaveProperty("pgbouncer");
    expect(config).toHaveProperty("limits");
    expect(config).toHaveProperty("quotas");
  });
});

describe("limitRange", () => {
  test("generates correct values", () => {
    const config = limitRange();
    expect(config).toHaveProperty("limits");
    expect(config.limits).toHaveLength(2);
  });
});

describe("constraints", () => {
  test("correctly applies constraints for missing/default config", () => {
    const deployment = {
      id: casual.uuid
    };
    const config = constraints(deployment);
    expect(config.quotas.pods).toBe(14); // Default celery (7 pods), doubled.
    expect(config.quotas["requests.cpu"]).toBe("5400m"); // 2500 doubled + 200 sidecar doubled
    expect(config.quotas["requests.memory"]).toBe("20736Mi"); // 9600 doubled + 768 sidecar doubled
    expect(config.quotas["requests.cpu"]).toBe(config.quotas["requests.cpu"]);
    expect(config.quotas["requests.memory"]).toBe(
      config.quotas["requests.memory"]
    );
    expect(config.pgbouncer.metadataPoolSize).toBe(12);
    expect(config.pgbouncer.maxClientConn).toBe(125);
    expect(config).not.toHaveProperty("allowPodLaunching");
  });

  test("correctly applies constraints for extra au property", () => {
    const deployment = {
      id: casual.uuid,
      properties: [{ key: DEPLOYMENT_PROPERTY_EXTRA_AU, value: 10 }]
    };
    const config = constraints(deployment);
    expect(config.quotas.pods).toBe(24); // Same as default celery + 10 extra
    expect(config.quotas["requests.cpu"]).toBe("6400m"); // Same as default celery + 1000 extra
    expect(config.quotas["requests.memory"]).toBe("24576Mi"); // Same as default celery + 3840 extra
    expect(config.quotas["requests.cpu"]).toBe(config.quotas["requests.cpu"]);
    expect(config.quotas["requests.memory"]).toBe(
      config.quotas["requests.memory"]
    );
    expect(config.pgbouncer.metadataPoolSize).toBe(17); // Same as celery default + 5 (.5 * 10)
    expect(config.pgbouncer.maxClientConn).toBe(175); // Same as celery default + 50 (5 * 10)
    expect(config.allowPodLaunching).toBeTruthy();
  });

  test("correctly applies constraints for LocalExecutor config", () => {
    const deployment = {
      id: casual.uuid,
      config: { executor: AIRFLOW_EXECUTOR_LOCAL }
    };
    const config = constraints(deployment);
    expect(config.quotas.pods).toBe(8); // Local (4 pods), doubled.
    expect(config.quotas["requests.cpu"]).toBe("2800m"); // 1100 doubled + 300 sidecar doubled
    expect(config.quotas["requests.memory"]).toBe("10752Mi"); // 4224 doubled + 1152 sidecar doubled
    expect(config.quotas["requests.cpu"]).toBe(config.quotas["requests.cpu"]);
    expect(config.quotas["requests.memory"]).toBe(
      config.quotas["requests.memory"]
    );
    expect(config.pgbouncer.metadataPoolSize).toBe(5);
    expect(config.pgbouncer.maxClientConn).toBe(55);
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

  test("correctly handles an undefined environment list", () => {
    // Run the transformation.
    const obj = transformEnvironmentVariables();
    expect(obj).toEqual({});
  });
});
