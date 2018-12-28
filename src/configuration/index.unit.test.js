import { getBoolean } from "./index";

describe("getBoolean", () => {
  test("enabled providers return true", () => {
    expect(getBoolean("auth.google.enabled")).toBe(true);
  });

  test("disabled providers return false", () => {
    expect(getBoolean("auth.github.enabled")).toBe(false);
  });

  test("nonexistent providers return false", () => {
    expect(getBoolean("auth.notaprovider.enabled")).toBe(false);
  });
});
