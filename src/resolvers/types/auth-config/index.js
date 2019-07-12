import { providerEnabled, getClient } from "oauth/config";
import { prisma } from "generated/client";
import config from "config";

/*
 * Return a boolean indicating if public signups are enabled.
 * @return {Boolean} Public signups enabled.
 */
export function publicSignup() {
  return config.get("publicSignups");
}

/*
 * Return a boolean indicating if there is an initial signup yet.
 * @return {Boolean} Initial signup.
 */
export async function initialSignup() {
  const count = await prisma
    .usersConnection({})
    .aggregate()
    .count();

  return count === 0;
}

/*
 * Return a boolean indicating if local auth is enabled.
 * @return {Boolean} Local auth enabled.
 */
export function localEnabled() {
  return config.get("auth.local.enabled");
}

/*
 * Return a boolean indicating if google is enabled.
 * @return {Boolean} Google auth enabled.
 */
export function googleEnabled() {
  return providerEnabled("google");
}

/*
 * Return a string for google OAuth url.
 * @return {Boolean} Google OAuth url.
 */
export async function googleOAuthUrl(parent) {
  return providerEnabled("google")
    ? (await getClient("google")).authUrl(parent)
    : null;
}

/*
 * Return a boolean indicating if Auth0 is enabled.
 * @return {Boolean} Auth0 auth enabled.
 */
export function auth0Enabled() {
  return providerEnabled("auth0");
}

/*
 * Return a string for Auth0 OAuth url.
 * @return {Boolean} Auth0 OAuth url.
 */
export async function auth0OAuthUrl(parent) {
  return providerEnabled("auth0")
    ? (await getClient("auth0")).authUrl(parent)
    : null;
}

/*
 * Return a boolean indicating if Github is enabled.
 * @return {Boolean} Github auth enabled.
 */
export function githubEnabled() {
  return config.get("auth.github.enabled");
}

/*
 * Return a string for Github OAuth url.
 * @return {Boolean} Github OAuth url.
 */
export async function githubOAuthUrl(parent) {
  return (await getClient("auth0")).authUrl(parent, "github");
}

export function oktaEnabled() {
  return providerEnabled("okta");
}

export async function oktaOAuthUrl(parent) {
  return providerEnabled("okta")
    ? (await getClient("okta")).authUrl(parent)
    : null;
}

export default {
  publicSignup,
  initialSignup,
  localEnabled,
  googleEnabled,
  googleOAuthUrl,
  auth0Enabled,
  auth0OAuthUrl,
  githubEnabled,
  githubOAuthUrl,
  oktaEnabled,
  oktaOAuthUrl
};
