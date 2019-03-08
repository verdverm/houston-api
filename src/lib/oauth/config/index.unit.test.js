import { oauthUrl, oauthRedirectUrl, getProvider } from "./index";

describe("oauth configuration", () => {
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
