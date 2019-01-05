import commander from "./index";

describe("commander", () => {
  test("skips call if commander disabled", async () => {
    const res = await commander.request("ping");
    expect(res).toBeUndefined();
  });
});
