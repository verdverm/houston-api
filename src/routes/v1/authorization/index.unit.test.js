import router from "./index";
import * as handler from "./handler";
import { decodeJWT } from "jwt";
// Import * as prismaExports from "generated/client";
import casual from "casual";
import request from "supertest";
import express from "express";

// Create test application.
const app = express().use(router);

describe.skip("POST /authorization", () => {
  test("fails if no user token or user is found", async () => {
    const res = await request(app)
      .post("/")
      .send({});

    expect(res.statusCode).toBe(401);
  });
});

describe("airflowJWT", () => {
  test("contains the expected claims", async () => {
    const user = {
      id: casual.uuid,
      fullName: casual.name,
      username: casual.email
    };

    const host = casual.domain;

    const token = handler.airflowJWT(user, ["Op"], host);

    const claims = await decodeJWT(token);

    expect(claims).toHaveProperty("aud", host);
    expect(claims).toHaveProperty("exp", expect.any(Number));
    expect(claims).toHaveProperty("nbf", expect.any(Number));
    expect(claims).toHaveProperty("roles", ["Op"]);
    expect(claims).toHaveProperty("sub", user.id);
    expect(claims).toHaveProperty("full_name", user.fullName);
    expect(claims).toHaveProperty("email", user.username);
  });
});
