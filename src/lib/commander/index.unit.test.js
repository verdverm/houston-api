import commander from "./index";

describe("commander", () => {
  test("skips call if commander disabled", async () => {
    const client = commander();
    const res = await client.request("ping");
    expect(res).toBeUndefined();
  });
});
