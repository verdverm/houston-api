import { getClient, providerCfg, ClientCache } from "./index";
import { URL } from "url";

describe("oauth configuration", () => {
  test("provider is returned for valid provider string", async () => {
    await expect(getClient("google")).resolves.toBeTruthy();
    await expect(getClient("auth0")).resolves.toBeTruthy();
  });

  describe("auth0 provider", () => {
    let client, authParams;
    beforeAll(async () => {
      client = await getClient("auth0");
      authParams = new URL(client.authorizationUrl({})).searchParams;
    });

    test("should include client_id", () => {
      expect(authParams.get("client_id")).toBe("fake-auth0-client-id");
    });

    test("should include audience", () => {
      expect(authParams.get("audience")).toBe("astronomer-ee");
    });

    test("Uses global redirector for production", async () => {
      const old_env = process.env.NODE_ENV;
      try {
        process.env.NODE_ENV = "production";
        expect(client.oauthRedirectUrl()).toEqual(
          "https://redirect.astronomer.io"
        );
      } finally {
        process.env.NODE_ENV = old_env;
      }
    });

    test("Uses local redirector for dev", async () => {
      expect(client.oauthRedirectUrl()).toEqual(
        expect.stringMatching(/https?:\/\/houston./)
      );
    });

    describe("when using a different discoveryUrl", () => {
      const old_url = providerCfg.auth0.discoveryUrl;
      beforeAll(async () => {
        // This isn't a valid Auth0 url, so we don't want to _fetch_ it, just pretened that we did.
        providerCfg.auth0.discoveryUrl = "https://my-fake-org.auth0.com";
      });
      afterAll(async () => {
        providerCfg.auth0.discoveryUrl = old_url;
      });

      test("should use local redirector", async () => {
        expect(client.oauthRedirectUrl()).toEqual(
          expect.stringMatching(/https?:\/\/houston./)
        );
      });
    });
  });

  describe("When google client_id is null", () => {
    let client, authParams;
    beforeAll(async () => {
      providerCfg.google.clientId = null;

      client = await getClient("google");
      authParams = new URL(client.authorizationUrl({})).searchParams;
    });

    afterAll(() => {
      ClientCache.delete("google");
    });

    test("should use the Auth0 provider", async () => {
      expect(client.issuer.metadata.name).toBe("auth0");
      expect(client.metadata.displayName).toBe("Google");
    });

    test("should include connection in URL", async () => {
      expect(authParams.get("connection")).toBe("google-oauth2");
    });

    test("should include provider in state", async () => {
      const state = JSON.parse(authParams.get("state"));
      expect(state.provider).toBe("google");
    });
  });

  describe("When github is enabled", () => {
    let client, authParams;
    beforeAll(async () => {
      providerCfg.github.enabled = true;

      client = await getClient("github");
      authParams = new URL(client.authorizationUrl({})).searchParams;
    });

    afterAll(() => {
      ClientCache.delete("github");
    });

    test("should use the Auth0 provider", async () => {
      expect(client.issuer.metadata.name).toBe("auth0");
      expect(client.metadata.displayName).toBe("GitHub");
    });

    test("should include connection in URL", async () => {
      expect(authParams.get("connection")).toBe("github");
    });

    test("should include provider in state", async () => {
      const state = JSON.parse(authParams.get("state"));
      expect(state.provider).toBe("github");
    });
  });

  describe("when google client_id is not", () => {
    let client, authParams;
    beforeAll(async () => {
      providerCfg.google.clientId = "fake-client-id";

      client = await getClient("google");
      authParams = new URL(client.authorizationUrl({})).searchParams;
    });

    afterAll(() => {
      ClientCache.delete("google");
    });

    test("should use Google directly", async () => {
      expect(client.issuer.metadata.name).toBe("google");
      expect(client.metadata.displayName).toBe("Google");
    });

    test("should not include connection in URL", async () => {
      expect(authParams.get("connection")).toBeNull();
    });

    test("should include client_id", () => {
      expect(authParams.get("client_id")).toBe("fake-client-id");
    });

    test("should use local redirector", async () => {
      expect(client.oauthRedirectUrl()).toEqual(
        expect.stringMatching(/https?:\/\/houston./)
      );
    });

    test("should include provider in state", async () => {
      const state = JSON.parse(authParams.get("state"));
      expect(state.provider).toBe("google");
    });
  });

  test("throws error for invalid provider string", async () => {
    await expect(getClient("notaprovider")).rejects.toThrow();
  });
});
