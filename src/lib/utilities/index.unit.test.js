import { parseJSON } from "./index";

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
