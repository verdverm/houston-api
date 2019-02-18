import { parseJSON, getCookieName } from "./index";
import config from "config";

describe("parseJSON", () => {
  test("correctly parses a valid JSON object", () => {
    const str = '{"something":"somevalue"}';
    const res = parseJSON(str);
    expect(res).toHaveProperty("something", "somevalue");
  });

  test("correctly parses a valid JSON array", () => {
    const str = '["someone@somewhere.com"]';
    const res = parseJSON(str);
    expect(res).toHaveLength(1);
  });

  test("correctly returns a non JSON string", () => {
    const str = "someone@somewhere.com";
    const res = parseJSON(str);
    expect(res).toBe(str);
  });
});

describe("getCookieName", () => {
  test("correctly sets a cookie name", () => {
    config.helm.baseDomain = "datarouter.ai";
    const name = getCookieName();
    expect(name).toBe("astronomer_datarouter_ai_auth");
  });
});
