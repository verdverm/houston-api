import { generateKid } from "registry/libtrust";
import { MissingTLSCertificateError } from "errors";
import jwt from "jsonwebtoken";
import config from "config";
import { memoize } from "lodash";
import path from "path";
import fs from "fs";
import crypto from "crypto";

/*
 * Create a new JWT for the docker registry.
 * @param {String} userId (sub) A users id.
 * @param {Object} payload (access) JWT payload.
 * @return {Promise<String>} The token.
 */
export function createDockerJWT(sub, access, expiration = 3600) {
  const { crt, key } = loadCert();
  const { issuer: iss, service: aud } = config.get("registry");
  const now = Math.floor(Date.now() / 1000);
  const exp = now + expiration;
  const jti = crypto.randomBytes(16).toString("hex");
  const payload = { iss, sub, aud, exp, jti, nbf: now, iat: now, access };
  return jwt.sign(payload, key, {
    algorithm: "RS256",
    header: { kid: generateKid(crt) }
  });
}

/*
 * Load the TLS certificate into memory.
 * @return {Object} The contents of the cert and key files.
 */
export const loadCert = memoize(function loadCert() {
  try {
    const { certPath } = config.get("registry");
    const crt = fs.readFileSync(path.join(certPath, "tls.crt"));
    const key = fs.readFileSync(path.join(certPath, "tls.key"));
    return { crt, key };
  } catch {
    throw new MissingTLSCertificateError();
  }
});
