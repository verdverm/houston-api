import { oauthUrl } from "oauth/config";
import { JWTValidationError } from "errors";
import jsonwebtoken from "jsonwebtoken";
import OktaJwtVerifier from "@okta/jwt-verifier";
import config from "config";
import { merge } from "lodash";
import shortid from "shortid";
import querystring from "querystring";

// Grab the configuration.
const cfg = config.get("auth.okta");
/*
 * Generate the authentication url for Okta.
 * @return {String} The authentication url.
 */
export function authUrl(state, redirectUrl, integration = "self") {
  const params = {
    client_id: cfg.clientId,
    response_type: "code id_token token",
    scope: "openid profile email",
    redirect_uri: redirectUrl,
    nonce: shortid.generate(),
    state: JSON.stringify(
      merge(
        {
          provider: "okta",
          integration,
          origin: oauthUrl()
        },
        state
      )
    )
  };
  const qs = querystring.stringify(params);
  return `https://${cfg.baseDomain}/v1/authorize?${qs}`;
}

/*
 * Validate the JWT from Okta.
 * @return {String} The JWT.
 */
export async function validate(data) {
  const verifier = new OktaJwtVerifier({
    issuer: `https://${cfg.baseDomain}`,
    clientId: cfg.clientId
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
    verifier.jwksClient.getSigningKey(kid, (err, key) => {
      if (err) return reject(err);
      return resolve(key.publicKey || key.rsaPublicKey);
    });
  });

  if (exp < Math.floor(new Date().getTime() / 1000)) {
    throw new JWTValidationError("JWT invalid: expired");
  }

  if (iss !== `https://${cfg.baseDomain}`) {
    throw new JWTValidationError("JWT invalid, 'iss' mismatch");
  }

  if (aud !== cfg.clientId) {
    throw new JWTValidationError("JWT invalid, 'aud' mismatch");
  }
  return jwt;
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
    avatarUrl: null
  };
}

export function expires(exp) {
  const current = new Date();
  current.setSeconds(current.getSeconds() + exp * 1000);
  return current.toISOString();
}

export default { authUrl, validate, userData, expires };
