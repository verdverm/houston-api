import validateResources from "./index";

describe("When valid resources are passed", () => {
  test("it does not throw an error", () => {
    const resources = {
      scheduler: { resources: { limits: { cpu: 100, memory: 256 } } },
      webserver: { resources: { limits: { cpu: 100, memory: 256 } } }
    };

    const max = { cpu: "4000m", memory: "15360m" };

    // Just ensure we don't throw an error here
    expect(validateResources(resources, max)).toBe(undefined);
  });
});

describe("When invalid resources are passed", () => {
  test("it throws an error", () => {
    const resources = {
      scheduler: { resources: { limits: { cpu: 5000, memory: 256 } } },
      webserver: { resources: { limits: { cpu: 5000, memory: 256 } } }
    };

    const max = { cpu: "4000m", memory: "15360m" };

    expect(() => {
      validateResources(resources, max);
    }).toThrow();
  });
});

describe("When undefined resources are passed", () => {
  test("it throws an error", () => {
    const resources = {
      scheduler: undefined,
      webserver: undefined
    };

    const max = { cpu: "4000m", memory: "15360m" };

    // Just ensure we don't throw an error here
    expect(validateResources(resources, max)).toBe(undefined);
  });
});
