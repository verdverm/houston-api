import { urls, env, properties, deployInfo } from "./index";
import { generateReleaseName } from "deployments/naming";
import { AIRFLOW_EXECUTOR_DEFAULT } from "constants";

describe("Deployoment", () => {
  test("urls returns correct urls", () => {
    const releaseName = generateReleaseName();
    const config = { executor: AIRFLOW_EXECUTOR_DEFAULT };
    const parent = { config, releaseName };
    const theUrls = urls(parent);

    expect(theUrls).toHaveLength(2);

    expect(theUrls[0]).toHaveProperty("type", "airflow");
    expect(theUrls[0]).toHaveProperty("url");
    expect(theUrls[0].url).toEqual(expect.stringContaining(releaseName));

    expect(theUrls[1]).toHaveProperty("type", "flower");
    expect(theUrls[1]).toHaveProperty("url");
    expect(theUrls[1].url).toEqual(expect.stringContaining(releaseName));
  });

  test("env correctly returns envs", async () => {
    const releaseName = generateReleaseName();
    const parent = { releaseName };

    // Create mock commander client.
    const commander = {
      request: jest.fn().mockReturnValue({
        secret: { data: { AIRFLOW_HOME: "/tmp" } }
      })
    };

    const envs = await env(parent, {}, { commander });
    expect(envs).toHaveLength(1);
  });

  test("properties correctly returns properties", async () => {
    const parent = { extraAu: 50 };
    const ret = await properties(parent);
    expect(ret).toHaveProperty("extra_au", 50);
  });

  test("deployInfo return an latest and next tags based on dockerImages", async () => {
    const parent = { id: "testId" };
    const db = {
      query: {
        dockerImages: jest
          .fn()
          .mockReturnValue([{ tag: "cli-1" }, { tag: "cli-2" }]),
        deployment: jest.fn()
      }
    };
    const { latest, next } = await deployInfo(parent, {}, { db });
    expect(latest).toEqual("cli-2");
    expect(next).toEqual("cli-3");
    expect(db.query.dockerImages.mock.calls).toHaveLength(1);
    expect(db.query.deployment.mock.calls).toHaveLength(0);
  });

  test("deployInfo return an latest and next tags based on default value", async () => {
    const parent = { id: "testId" };
    const db = {
      query: {
        dockerImages: jest.fn().mockReturnValue([]),
        deployment: jest.fn().mockReturnValue({})
      }
    };
    const { latest, next } = await deployInfo(parent, {}, { db });
    expect(latest).toBeUndefined();
    expect(next).toEqual("cli-1");
    expect(db.query.dockerImages.mock.calls).toHaveLength(1);
    expect(db.query.deployment.mock.calls).toHaveLength(0);
  });
});
