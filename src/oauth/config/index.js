import providers from "../providers";
import { InvalidAuthenticationProviderError } from "errors";
import config from "config";
import { get, has } from "lodash";

/*
 * Return full houston domain.
 * @return {String} The houston domain.
 */
export function domain() {
  return `houston.${config.get("helm.baseDomain")}`;
}

/*
 * Return full oauth url.
 * @return {String} The oauth url.
 */
export function oauthUrl() {
  return `https://${domain()}/oauth`;
}

/*
 * Return full oauth redirect url.
 * @return {String} The oauth redirect url.
 */
export function oauthRedirectUrl() {
  return `https://${domain()}/oauth_redirect`;
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
