import { oauthUrl } from "oauth/config";
import { JWTValidationError } from "errors";
import jsonwebtoken from "jsonwebtoken";
import jwks from "jwks-rsa";
import config from "config";
import { merge } from "lodash";
import shortid from "shortid";
import querystring from "querystring";

// Grab the configuration.
const cfg = config.get("auth.auth0");

/*
 * Generate the authentication url for Google.
 * @return {String} The authentication url.
 */
export function authUrl(state, redirectUrl, integration = "self") {
  const params = {
    client_id: cfg.clientId,
    response_type: "token id_token",
    redirect_uri: redirectUrl,
    scope: "openid profile email",
    audience: "astronomer-ee",
    nonce: shortid.generate(),
    state: JSON.stringify(
      merge(
        {
          provider: "auth0",
          integration,
          origin: oauthUrl()
        },
        state
      )
    )
  };

  if (integration !== "self") {
    params.connection = integration;
  }

  const qs = querystring.stringify(params);
  return `https://${cfg.baseDomain}/authorize?${qs}`;
}

/*
 * Validate the JWT from Auth0.
 * @return {String} The JWT.
 */
export async function validate(data) {
  const verifier = jwks({
    cache: true,
    jwksUri: `https://${cfg.baseDomain}/.well-known/jwks.json`
  });

  const jwt = jsonwebtoken.decode(data.encodedJWT, { complete: true });

  if (!jwt.header) {
    throw new JWTValidationError("JWT invalid, no header");
  }
  if (jwt.header.alg !== "RS256") {
    throw new JWTValidationError("JWT invalid, invalid signing algorithm");
  }

  const kid = jwt.header.kid;
  const iss = jwt.payload.iss;
  const aud = jwt.payload.aud;
  const exp = jwt.payload.exp;

  await new Promise((resolve, reject) => {
    verifier.getSigningKey(kid, (err, key) => {
      if (err) return reject(err);
      return resolve(key.publicKey || key.rsaPublicKey);
    });
  });

  if (exp < Math.floor(new Date().getTime() / 1000)) {
    throw new JWTValidationError("JWT invalid: expired");
  }

  if (iss !== `https://${cfg.baseDomain}/`) {
    throw new JWTValidationError("JWT invalid, 'iss' mismatch");
  }

  if (aud !== cfg.clientId) {
    throw new JWTValidationError("JWT invalid, 'aud' mismatch");
  }

  return jwt;
  // Data.decodedJWT = jwt.payload;
}

/*
 * Return data from the provider about the user.
 * @param {Object} The decoded JWT.
 * @return {Object} The user data.
 */
export function userData(jwt) {
  return {
    providerUserId: jwt.payload.sub,
    email: jwt.payload.email,
    fullName: jwt.payload.name,
    avatarUrl: jwt.payload.picture
  };
}

export function expires(exp) {
  const current = new Date();
  current.setSeconds(current.getSeconds() + exp * 1000);
  return current.toISOString();
}

export default { authUrl, validate, userData, expires };
