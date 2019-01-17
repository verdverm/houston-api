import {
  version,
  scheme,
  houston,
  orbit,
  oauthUrl,
  oauthRedirectUrl,
  getProvider
} from "./index";

describe("oauth configuration", () => {
  test("version is correctly set by config", () => {
    expect(version()).toEqual("v1");
  });

  test("scheme is correctly set by environment", () => {
    expect(scheme()).toEqual("http");
  });

  test("houston url is generated successfully", () => {
    expect(houston()).toContain("houston.");
  });

  test("orbit url is generated successfully", () => {
    expect(orbit()).toContain("app.");
  });

  test("houston url is generated successfully", () => {
    expect(oauthUrl()).toEqual(expect.stringMatching(/https?:\/\/houston./));
  });

  test("houston url is generated successfully", () => {
    expect(oauthRedirectUrl()).toEqual(
      expect.stringMatching(/https?:\/\/houston./)
    );
  });

  test("provider is returned for valid provider string", () => {
    expect(getProvider("google")).toBeTruthy();
    expect(getProvider("auth0")).toBeTruthy();
  });

  test("throws error for invalid provider string", () => {
    expect(() => getProvider("notaprovider")).toThrow();
  });
});
