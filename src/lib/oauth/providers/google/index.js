import { oauthUrl } from "oauth/config";
import { JWTValidationError } from "errors";
import config from "config";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import shortid from "shortid";
import moment from "moment";
import { merge } from "lodash";

// Grab the configuration.
const cfg = config.get("auth.google");

/*
 * Generate the authentication url for Google.
 * @return {String} The authentication url.
 */
export function authUrl(state, redirectUrl, integration = "self") {
  // Create oauth client.
  const client = new google.auth.OAuth2(cfg.clientId, null, redirectUrl);

  // Generate the authUrl.
  return client.generateAuthUrl({
    include_granted_scopes: true,
    response_type: "token id_token",
    scope: ["profile", "email"],
    nonce: shortid.generate(),
    state: JSON.stringify(
      merge(
        {
          provider: "google",
          integration,
          origin: oauthUrl()
        },
        state
      )
    )
  });
}

/*
 * Validate the JWT from Google.
 * @return {String} The JWT.
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
    throw new JWTValidationError("JWT invalid, expired");
  }
  if (jwt.iss !== "https://accounts.google.com") {
    throw new JWTValidationError("JWT invalid, 'iss' mismatch");
  }
  if (jwt.aud !== cfg.clientId) {
    throw new JWTValidationError("JWT invalid, 'aud' mismatch");
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
    email: jwt.email,
    fullName: jwt.name,
    avatarUrl: jwt.picture
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
