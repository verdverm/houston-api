import router from "./index";
import { prisma } from "generated/client";
import casual from "casual";
import request from "supertest";
import express from "express";
import { DOCKER_REGISTRY_CONTENT_TYPE } from "constants";

jest.mock("generated/client", () => {
  return {
    __esModule: true,
    prisma: jest.fn().mockName("MockPrisma")
  };
});

// Create test application.
const app = express().use(router);

describe("POST /registry-events", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("registry events are mapped to a deployment upgrade", async () => {
    prisma.deployment = jest
      .fn()
      .mockName("deployment")
      .mockReturnValue({
        config() {
          return {};
        }
      });
    prisma.updateDeployment = jest
      .fn()
      .mockName("updateDeployment")
      .mockReturnValue({});

    const res = await request(app)
      .post("/")
      .set("Content-Type", DOCKER_REGISTRY_CONTENT_TYPE)
      .send({
        events: [
          {
            id: casual.uuid,
            action: "push",
            target: {
              repository: "cosmic-dust-1234/airflow",
              tag: "cli-1"
            },
            request: {
              host: casual.domain
            }
          }
        ]
      });

    expect(prisma.deployment).toHaveBeenCalledTimes(1);
    expect(prisma.updateDeployment).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toBe(200);
  });

  test("skip if irrelevent event is sent", async () => {
    const res = await request(app)
      .post("/")
      .send({
        events: [
          {
            id: casual.uuid,
            action: "push",
            target: {
              repository: "cosmic-dust-1234/airflow",
              tag: "latest"
            },
            request: {
              host: casual.domain
            }
          }
        ]
      });

    expect(prisma.deployment).toHaveBeenCalledTimes(0);
    expect(prisma.updateDeployment).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toBe(200);
  });

  test("skip if non-deployment event is sent", async () => {
    // Set up our spies.
    const res = await request(app)
      .post("/")
      .send({
        events: [
          {
            id: casual.uuid,
            action: "push",
            target: {
              repository: "base-images/airflow",
              tag: "0.10.2-1.10.5"
            },
            request: {
              host: casual.domain
            }
          }
        ]
      });

    expect(prisma.deployment).toHaveBeenCalledTimes(0);
    expect(prisma.updateDeployment).toHaveBeenCalledTimes(0);
    expect(res.statusCode).toBe(200);
  });
});
