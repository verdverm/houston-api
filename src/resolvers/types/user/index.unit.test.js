import { profile } from "./index";
import casual from "casual";

describe("User", () => {
  test("returns empty profile if no parent values exist", () => {
    const parent = {};
    expect(profile(parent)).toEqual([]);
  });

  test("reteurns a profile if avatarUrl is returned from parent", () => {
    const parent = { avatarUrl: casual.url };
    const res = profile(parent);
    expect(res).toHaveLength(1);
    expect(res[0]).toHaveProperty("key", "avatarUrl");
    expect(res[0]).toHaveProperty("value", parent.avatarUrl);
  });
});
