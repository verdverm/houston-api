import { InvalidAuthenticationProviderError } from "errors";
import { version, houston } from "utilities";
import { Issuer, Registry } from "openid-client";
import config from "config";
import shortid from "shortid";
import { has, merge, get, upperFirst } from "lodash";

export const providerCfg = config.get("auth.openidConnect");
export const ClientCache = new Map();

export const DEFAULT_CLIENT_ARGS = {
  scope: "openid profile email",
  response_type: "token id_token",
  response_mode: "fragment"
};

/*
 * Return full oauth url.
 * @return {String} The oauth url.
 */
export function oauthUrl() {
  return `${houston()}/${version()}/oauth/callback`;
}

/*
 * Return full oauth redirect url.
 * @return {String} The oauth redirect url.
 */
export function oauthRedirectUrl() {
  const isProd = process.env.NODE_ENV === "production";
  const { discoveryUrl: auth0Url } = providerCfg.auth0;
  const defaultAuth0 = auth0Url === "https://astronomerio.auth0.com";

  // If we're in prod with the default auth0 domain configured,
  // return the shared redirect url. This is for the shared
  // auth0 account that is enabled by default. Auth0 requires a list
  // of redirect urls that are authorized. When a user installs
  // at a custom domain, the redirect won't work. To get around this,
  // we host a well-known url to use by default.
  if (isProd && defaultAuth0) {
    return "https://redirect.astronomer.io";
  }

  // Otherwise return the redirect url of the installation. If a user, brings
  // their own auth0 account, this will be used and will skip the shared url.
  return `${houston()}/${version()}/oauth/redirect`;
}

/*
 * Return if an oauth module is enabled.
 * @param {String} The provider name.
 * @return {Boolean} Module enabled.
 */
export function providerEnabled(name) {
  return has(providerCfg, name) && providerCfg[name].enabled;
}

/*
 * List the names of the enabled providers
 * @return {Boolean} Module enabled.
 */
export function enabledProviders() {
  return Object.keys(providerCfg).filter(name => providerCfg[name].enabled);
}

/*
 * Return oauth module based on provider string
 * @param {String} The provider name.
 * @return {Object} The provider module.
 */
export async function getClient(name) {
  if (ClientCache.has(name)) {
    return ClientCache.get(name);
  }

  if (!providerEnabled(name)) throw new InvalidAuthenticationProviderError();

  let issuer;
  if (name == "google" && !providerCfg.google.clientId) {
    // If we haven't been provided a google clientId use the auth0-to-google bridge.
    issuer = await _getIssuer("auth0", "google-oauth2");
  } else if (name == "github") {
    issuer = await _getIssuer("auth0", "github");
  }

  if (!issuer) issuer = await _getIssuer(name);

  const client = new issuer.Client();
  client.metadata.displayName =
    providerCfg[name].displayName || upperFirst(name);
  ClientCache.set(name, client);
  return client;
}

async function _getIssuer(name, integration = "self") {
  const issuer = await Issuer.discover(providerCfg[name].discoveryUrl);

  issuer.metadata.name = name;
  issuer.metadata.authUrlParams = merge(
    {},
    DEFAULT_CLIENT_ARGS,
    get(providerCfg[name], "authUrlParams")
  );

  return subclassClient(issuer, providerCfg[name].clientId, integration);
}

function subclassClient(issuer, clientId, integration) {
  // The Issuer has a "hard-coded" client class that we can't easily change the
  // behaviour of as it isn't exported except via the `Client` property of an
  // Issuer instance.
  const Client = issuer.Client;
  class AstroClient extends Client {
    constructor(meta = {}) {
      super(merge(meta, { client_id: clientId }));
    }

    authUrl(state) {
      const params = merge({}, this.issuer.metadata.authUrlParams, {
        redirect_uri: oauthRedirectUrl(),
        nonce: shortid.generate(),
        state: JSON.stringify(
          merge(
            {
              provider: this.issuer.metadata.name,
              integration,
              origin: oauthUrl()
            },
            state
          )
        )
      });

      if (this.issuer.metadata.name == "auth0" && integration != "self") {
        params.connection = integration;
      }
      return this.authorizationUrl(params);
    }
  }

  const newIssuer = Object.create(issuer);
  Object.defineProperty(newIssuer, "Client", { value: AstroClient });
  Registry.set(newIssuer.issuer, newIssuer);
  return newIssuer;
}

function synthesiseConfig() {
  // Make github look like an OIDC auth provider, even though it isn't. It is
  // handled in getClient to go via Auth0
  providerCfg["github"] = {
    enabled: config.get("auth.github.enabled"),
    displayName: "GitHub"
  };
}

synthesiseConfig();
