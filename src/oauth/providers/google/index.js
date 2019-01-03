import { oauthUrl } from "../../config";
import config from "config";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import shortid from "shortid";
import moment from "moment";

// Grab the configuration.
const cfg = config.get("auth.google");

/*
 * Generate the authentication url for Google.
 * @return {String} The authentication url.
 */
export function authUrl(redirectUrl) {
  // Create oauth client.
  const client = new google.auth.OAuth2(cfg.clientId, null, redirectUrl);

  // Generate the authUrl.
  return client.generateAuthUrl({
    include_granted_scopes: true,
    response_type: "token id_token",
    scope: ["profile", "email"],
    nonce: shortid.generate(),
    state: JSON.stringify({
      provider: "google",
      integration: "self",
      origin: oauthUrl()
    })
  });
}

/*
 * Generate the authentication url for Google.
 * @return {String} The authentication url.
 */
export async function validate(data) {
  // Create Google OAuth2Client.
  const verifier = new OAuth2Client(cfg.clientId);

  // Verify token.
  const ticket = await verifier.verifyIdToken({
    idToken: data.encodedJWT,
    audience: cfg.clientId
  });

  // Get the decoded JWT.
  const jwt = ticket.getPayload();

  // Validate JWT properties.
  if (jwt.exp < moment().unix()) {
    throw new Error();
  }
  if (jwt.iss !== "https://accounts.google.com") {
    throw new Error();
  }
  if (jwt.aud !== cfg.clientId) {
    throw new Error();
  }

  // Return the JWT.
  return jwt;
}

/*
 * Return data from the provider about the user.
 * @param {Object} The decoded JWT.
 * @return {Object} The user data.
 */
export function userData(jwt) {
  return {
    providerUserId: jwt.sub,
    profile: {
      email: jwt.email,
      fullName: jwt.name,
      pictureUrl: jwt.picture
    }
  };
}

/*
 * Return expiration date in correct format for provider.
 * @param {String} The input expiration date.
 * @return {String} The output expiration date.
 */
export function expires(exp) {
  return exp;
}

export default { authUrl, validate, userData, expires };
