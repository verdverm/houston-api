import router from "./index";
import * as prisma from "generated/client";
import { createJWT, decodeJWT } from "jwt";
import * as rbac from "rbac";
import casual from "casual";
import supertest from "supertest";
import express from "express";
import { DEPLOYMENT_ADMIN } from "constants";

jest.mock("rbac");
jest.mock("generated/client", () => {
  const Prisma = jest.fn().mockName("MockPrisma");
  return {
    __esModule: true,
    Prisma,
    prisma: new Prisma()
  };
});
jest.mock("errors/express", () => {
  // Replace the error catcher with one that just throws, so that errors in tests are reported!
  return { catchAsyncError: fn => fn };
});

// Create test application.
const app = express().use(router);
const request = supertest(app);

describe("POST /registry", () => {
  test("fails if no no Authorization header", async () => {
    const res = await request.get("/");

    expect(res.statusCode).toBe(403);
    expect(res.body).not.toHaveProperty("token");
  });

  test.each([["not-basic"], ["Bearer jwt.x"]])(
    "fails with %o Authorization header",
    async value => {
      const res = await request.get("/").set("Authorization", value);

      expect(res.statusCode).toBe(401);
      expect(res.body).not.toHaveProperty("token");
    }
  );

  test("Made up Basic auth fails", async () => {
    const res = await request.get("/").auth("-", "letmein");

    expect(res.statusCode).toBe(401);
    expect(res.body).not.toHaveProperty("token");
  });

  describe("with valid user JWT", () => {
    const id = casual.uuid;
    const deploymentId = casual.id;
    const jwtToken = createJWT({ uuid: id });
    const userObject = {
      id,
      roleBindings: [
        { role: DEPLOYMENT_ADMIN, deployment: { id: deploymentId } }
      ]
    };

    beforeEach(() => {});
    rbac.hasPermission.mockClear();
    beforeAll(() => {
      rbac.hasPermission.mockReturnValue(false);
      rbac.getAuthUser.mockReturnValue(userObject);
      rbac.accesibleDeploymentsWithPermission.mockReturnValue([]);

      prisma.prisma.deployment = jest
        .fn()
        .mockReturnValue({ id: jest.fn().mockResolvedValue(deploymentId) });
    });

    test("works without scope param", async () => {
      // Not passing a scope param simulates `docker login`
      const res = await request.get("/").auth("-", jwtToken);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");

      const jwt = await decodeJWT(res.body.token);
      expect(jwt.access).toEqual([
        // We always include the base images for any authenticated user
        { actions: ["pull"], name: "base-images/airflow", type: "repository" }
      ]);
    });

    test("permission denied for non-deployment image", async () => {
      const res = await request
        .get("/")
        .query({ scope: "repository:not-a-deployment/foo/bar:push,pull" })
        .auth("-", jwtToken);

      expect(res.statusCode).toBe(401);
      expect(res.body).not.toHaveProperty("token");
      expect(res.body.errors).toHaveLength(1);
      expect(res.body).toHaveProperty(["errors", 0, "code"], "NAME_UNKNOWN");
    });

    test("permission denied without right permissions", async () => {
      const res = await request
        .get("/")
        .query({ scope: "repository:imploding-sun-1234/airflow:push,pull" })
        .auth("-", jwtToken);

      expect(res.statusCode).toBe(401);
      expect(res.body).not.toHaveProperty("token");
    });

    test.each`
      scope          | expectedPermission          | expected
      ${"push,pull"} | ${"deployment.images.push"} | ${["push", "pull"]}
      ${"pull"}      | ${"deployment.images.pull"} | ${["pull"]}
    `(
      "returns JWT payload with correct permissions for $scope",
      async ({ scope, expectedPermission, expected }) => {
        rbac.hasPermission.mockReturnValueOnce(true);

        const res = await request
          .get("/")
          .query({ scope: `repository:imploding-sun-1234/airflow:${scope}` })
          .auth("-", jwtToken);

        expect(res.body).not.toHaveProperty("errors"); // Aid
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");

        const decodedJWT = await decodeJWT(res.body.token);
        expect(decodedJWT.access).toEqual([
          {
            actions: expected,
            name: "imploding-sun-1234/airflow",
            type: "repository"
          },
          { actions: ["pull"], name: "base-images/airflow", type: "repository" }
        ]);
        expect(rbac.hasPermission).toBeCalledWith(
          userObject,
          expectedPermission,
          "deployment",
          deploymentId
        );
      }
    );

    test.todo("invalid scope returns 401");

    test.todo("Other deployments are included in access");

    test.todo("Permission denied to base-images when normal user");

    test.todo("SysAdmins can push to base-images");
  });

  test.skip("'registryPassword' auth for deployment ImagePullSecret", async () => {});
});
