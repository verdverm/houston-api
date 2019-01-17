import jwt from "jsonwebtoken";
import config from "config";
import ms from "ms";

/*
 * Create a new JWT for houston.
 * @param {String} userId A users id.
 * @return {String} The token.
 */
export function createJWT(userId) {
  const millis = config.get("authDuration");

  // Create the payload.
  const payload = { uuid: userId };
  const token = jwt.sign(payload, config.get("jwtPassphrase"), {
    expiresIn: ms(millis),
    mutatePayload: true
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
  const millis = config.get("authDuration");

  // Set the cookie.
  return response.cookie("astronomer_auth", token, {
    domain: `.${config.get("helm.baseDomain")}`,
    path: "/",
    expires: new Date(millis),
    secure: true
  });
}
