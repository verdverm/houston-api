import { fullName } from "./index";
import casual from "casual";

describe("User", () => {
  test("returns fullName from profile", () => {
    const someName = casual.full_name;
    const parent = {
      profile: [{ key: "fullName", value: someName }]
    };
    const name = fullName(parent);
    expect(name).toBe(someName);
  });

  test("handles an emtpy profile", () => {
    const parent = {
      profile: []
    };
    const name = fullName(parent);
    expect(name).toBeUndefined();
  });
});
