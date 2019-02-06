import router from "./index";
import request from "supertest";
import express from "express";

// Create test application
const app = express().use(router);

describe("GET /oauth-redirect", () => {
  test("typical request is successful", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });
});
