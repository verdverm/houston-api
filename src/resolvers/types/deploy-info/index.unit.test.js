import { next } from "./index";

describe("next", () => {
  test("returns a default value if parent is empty", () => {
    expect(next({})).toBe("cli-1");
  });

  test("returns value if parent has it", () => {
    expect(next({ next: "cli-2" })).toBe("cli-2");
  });
});
