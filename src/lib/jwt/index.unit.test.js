import { createJWT, setJWTCookie } from "./index";
import casual from "casual";

describe("createJWT", () => {
  test("successfully creates a jwt for a userId", () => {
    const id = casual.uuid;
    const token = createJWT(id);
    expect(token).toHaveProperty("token");
    expect(token).toHaveProperty("payload");
    expect(token.payload.uuid).toBe(id);
    expect(token.payload.iat).toBe(Math.floor(new Date() / 1000));
    expect(token.payload.exp).toBeGreaterThan(Math.floor(new Date() / 1000));
  });
});

describe("setJWTCookie", () => {
  test("successfully sets cookie on http response", () => {
    const response = { cookie: jest.fn() };
    const token = createJWT(casual.uuid);
    setJWTCookie(response, token);
    expect(response.cookie.mock.calls).toHaveLength(1);
  });
});
