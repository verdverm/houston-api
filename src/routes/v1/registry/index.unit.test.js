import router from "./index";
// Import * as prismaExports from "generated/client";
// import casual from "casual";
import request from "supertest";
import express from "express";

// Create test application.
const app = express().use(router);

describe.skip("POST /registry", () => {
  test("fails if no user token or user is found", async () => {
    const res = await request(app)
      .post("/")
      .send({});

    expect(res.statusCode).toBe(401);
  });
});
