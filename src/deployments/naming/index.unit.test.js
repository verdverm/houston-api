import {
  generateReleaseName,
  generateNamespace,
  generateEnvironmentSecretName
} from "./index";

describe("deployment naming", () => {
  test("generateReleaseName", () => {
    expect(generateReleaseName()).toBeTruthy();
  });

  test("generateNamespace", () => {
    expect(generateNamespace("planetary-nebula-1234")).toEqual(
      expect.stringMatching(/^.*-planetary-nebula-1234/)
    );
  });

  test("generateEnvironmentSecretName", () => {
    const releaseName = "planetary-nebula-1234";
    expect(generateEnvironmentSecretName(releaseName)).toBe(
      `${releaseName}-env`
    );
  });
});
