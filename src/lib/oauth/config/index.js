import providers from "../providers";
import { InvalidAuthenticationProviderError } from "errors";
import { version, houston } from "utilities";
import config from "config";
import { get, has } from "lodash";

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
  const { baseDomain: auth0Domain } = config.get("auth.auth0");
  const defaultAuth0 = auth0Domain === "astronomerio.auth0.com";

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
  return has(providers, name);
}

/*
 * Return oauth module based on provider string
 * @param {String} The provider name.
 * @return {Object} The provider module.
 */
export function getProvider(name) {
  if (providerEnabled(name)) return get(providers, name);
  else throw new InvalidAuthenticationProviderError();
}
