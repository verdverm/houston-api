import providers from "oauth/providers";
import config from "configuration";
import { prisma } from "generated/client";

/*
 * Return a boolean indicating if public signups are enabled.
 * @return {Boolean} Public signups enabled.
 */
export function publicSignup() {
  return config.getBoolean("publicSignups");
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
  return config.getBoolean("auth.local.enabled");
}

/*
 * Return a boolean indicating if google is enabled.
 * @return {Boolean} Google auth enabled.
 */
export function googleEnabled() {
  return config.getBoolean("auth.google.enabled");
}

/*
 * Return a string for google OAuth url.
 * @return {Boolean} Google OAuth url.
 */
export function googleOAuthUrl(parent, args) {
  return config.getBoolean("auth.google.enabled")
    ? providers.google.authUrl(args.redirect)
    : null;
}

/*
 * Return a boolean indicating if Auth0 is enabled.
 * @return {Boolean} Auth0 auth enabled.
 */
export function auth0Enabled() {
  return config.getBoolean("auth.auth0.enabled");
}

/*
 * Return a string for Auth0 OAuth url.
 * @return {Boolean} Auth0 OAuth url.
 */
export function auth0OAuthUrl(parent, args) {
  return config.getBoolean("auth.auth0.enabled")
    ? providers.auth0.authUrl(args.redirect)
    : null;
}

/*
 * Return a boolean indicating if Github is enabled.
 * @return {Boolean} Github auth enabled.
 */
export function githubEnabled() {
  return false;
}

/*
 * Return a string for Github OAuth url.
 * @return {Boolean} Github OAuth url.
 */
export function githubOAuthUrl() {
  return null;
}

export default {
  publicSignup,
  initialSignup,
  googleEnabled,
  googleOAuthUrl,
  auth0Enabled,
  auth0OAuthUrl,
  githubEnabled,
  githubOAuthUrl
};
