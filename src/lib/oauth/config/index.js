import mixins from "../provider-mixins";
import { InvalidAuthenticationProviderError } from "errors";
import { Issuer, Registry } from "openid-client";
import config from "config";
import { has, merge, get, upperFirst } from "lodash";
import { mix } from "mixwith";

export const providerCfg = config.get("auth.openidConnect");
export const ClientCache = new Map();

export const DEFAULT_CLIENT_ARGS = {
  scope: "openid profile email",
  response_type: "token id_token",
  response_mode: "fragment"
};

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
  const clientMeta = {};
  if (name == "google" && !providerCfg.google.clientId) {
    // If we haven't been provided a google clientId use the auth0-to-google bridge.
    issuer = await _getIssuer("auth0");
    clientMeta.integration = "google-oauth2";
    clientMeta.providerName = "auth0";
  } else if (name == "github") {
    issuer = await _getIssuer("auth0");
    clientMeta.integration = "github";
    clientMeta.providerName = "auth0";
  }

  if (!issuer) issuer = await _getIssuer(name);

  const client = new issuer.Client(clientMeta);
  client.metadata.displayName =
    providerCfg[name].displayName || upperFirst(name);
  ClientCache.set(name, client);
  client.CLOCK_TOLERANCE = config.get("auth.openidConnect.clockTolerance");
  return client;
}

async function _getIssuer(key) {
  const issuer = await Issuer.discover(providerCfg[key].discoveryUrl);

  issuer.metadata.name = key;
  issuer.metadata.authUrlParams = merge(
    {},
    DEFAULT_CLIENT_ARGS,
    get(providerCfg[key], "authUrlParams")
  );

  return subclassClient(issuer, providerCfg[key].clientId);
}

function subclassClient(issuer, clientId) {
  // The Issuer has a "hard-coded" client class that we can't easily change the
  // behaviour of as it isn't exported except via the `Client` property of an
  // Issuer instance.

  // Always mix in our base mixin
  const clientMixins = [mixins.base];

  // And if there is a issuer specific mixin include that first.
  if (mixins[issuer.metadata.name]) {
    clientMixins.push(mixins[issuer.metadata.name]);
  }

  class AstroClient extends mix(issuer.Client).with(...clientMixins) {
    constructor(...args) {
      super(...args);
      this.client_id = clientId;
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
