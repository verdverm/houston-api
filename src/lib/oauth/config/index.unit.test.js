import {
  oauthUrl,
  oauthRedirectUrl,
  getClient,
  providerCfg,
  ClientCache
} from "./index";
import { URLSearchParams } from "url";

describe("oauth configuration", () => {
  test("houston url is generated successfully", () => {
    expect(oauthUrl()).toEqual(expect.stringMatching(/https?:\/\/houston./));
  });

  test("houston url is generated successfully", () => {
    expect(oauthRedirectUrl()).toEqual(
      expect.stringMatching(/https?:\/\/houston./)
    );
  });

  test("provider is returned for valid provider string", async () => {
    await expect(getClient("google")).resolves.toBeTruthy();
    await expect(getClient("auth0")).resolves.toBeTruthy();
  });

  describe("When google client_id is null", () => {
    beforeAll(() => {
      providerCfg.google.clientId = null;
    });

    afterAll(() => {
      ClientCache.delete("google");
    });

    test("should use the Auth0 provider", async () => {
      const client = await getClient("google");
      expect(client.issuer.metadata.name).toBe("auth0");
    });

    test("should include connection in URL", async () => {
      const client = await getClient("google");
      const params = new URLSearchParams(client.authUrl({}));

      expect(params.get("connection")).toBe("google-oauth2");
    });
  });

  describe("when google client_id is not", () => {
    beforeAll(() => {
      providerCfg.google.clientId = "fake-client-id";
    });

    afterAll(() => {
      ClientCache.delete("google");
    });

    test("should use Google directly", async () => {
      const client = await getClient("google");
      expect(client.issuer.metadata.name).toBe("google");
    });

    test("should not include connection in URL", async () => {
      const client = await getClient("google");
      const params = new URLSearchParams(client.authUrl({}));

      expect(params.get("connection")).toBeNull();
    });
  });

  test("throws error for invalid provider string", async () => {
    await expect(getClient("notaprovider")).rejects.toThrow();
  });
});
