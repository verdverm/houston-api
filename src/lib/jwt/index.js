import { MissingTLSCertificateError } from "errors";
import log from "logger";
import { getCookieName } from "utilities";
import jwt from "jsonwebtoken";
import config from "config";
import ms from "ms";
import { memoize } from "lodash";
import path from "path";
import fs from "fs";

/*
 * Create a new JWT for houston.
 * @param {String} userId A users id.
 * @return {String} The token.
 */
export function createJWT(userId) {
  const millis = config.get("jwt.authDuration");

  // Create the payload.
  const payload = { uuid: userId };
  const { signWith, alg } = jwtSigningParam();
  const token = jwt.sign(payload, signWith, {
    expiresIn: ms(millis),
    mutatePayload: true,
    algorithm: alg
  });

  // Return both for legacy purposes.
  return { token, payload };
}

/*
 * Set a jwt on http response.
 * @param {Object} response HTTP response.
 * @param {String} token JWT.
 */
export function setJWTCookie(response, token) {
  const millis = config.get("jwt.authDuration");

  // Set the cookie.
  return response.cookie(getCookieName(), token, {
    domain: `.${config.get("helm.baseDomain")}`,
    path: "/",
    expires: new Date(Date.now() + millis),
    secure: true
  });
}

/*
 * Decode a JWT.
 * @return {Object} The decoded JWT.
 */
export function decodeJWT(token) {
  // Decode the JWT.
  return new Promise(resolve => {
    const { signWith, algs } = jwtValidationParam();
    jwt.verify(token, signWith, { algorithms: algs }, (err, decoded) => {
      if (err) return resolve({});
      return resolve(decoded);
    });
  });
}

// To make it easier in development we fallback to signing JWTs with a
// symetric passhprase. But in any other NODE_ENV the certificiate is a
// requirment.
const jwtSigningParam = memoize(() => {
  if (
    process.env.NODE_ENV === "development" &&
    config.get("jwt.certPath") === null
  ) {
    log.warn("Signing JWT tokens with shared key (only allowed in dev!)");
    return { signWith: config.get("jwt.passphrase"), alg: "HS256" };
  }

  return { signWith: getSigningCert().key, alg: "RS256" };
});

const jwtValidationParam = memoize(() => {
  if (
    process.env.NODE_ENV === "development" &&
    config.get("jwt.certPath") === null
  ) {
    log.warn("Validating JWT tokens with shared key (only allowed in dev!");
    return { signWith: config.get("jwt.passphrase"), algs: ["HS256"] };
  }

  return { signWith: getSigningCert().crt, algs: ["RS256"] };
});

/*
 * Load the JWT signing private key into memory.
 * @return {Object} The contents of the cert and key files.
 */
export const getSigningCert = memoize(function getSigningCert() {
  try {
    const certPath = config.get("jwt.certPath");
    const crt = fs.readFileSync(path.join(certPath, "tls.crt"));
    const key = fs.readFileSync(path.join(certPath, "tls.key"));
    return { crt, key };
  } catch {
    throw new MissingTLSCertificateError();
  }
});
