import { domain, oauthUrl, oauthRedirectUrl, getProvider } from "./index";

describe("oauth configuration", () => {
  test("houston url is generated successfully", () => {
    expect(domain()).toContain("houston.");
  });

  test("houston url is generated successfully", () => {
    expect(oauthUrl()).toContain("https://houston.");
  });

  test("houston url is generated successfully", () => {
    expect(oauthRedirectUrl()).toContain("https://houston.");
  });

  test("provider is returned for valid provider string", () => {
    expect(getProvider("google")).toBeTruthy();
    expect(getProvider("auth0")).toBeTruthy();
  });

  test("throws error for invalid provider string", () => {
    expect(() => getProvider("notaprovider")).toThrow();
  });
});
