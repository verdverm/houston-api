import fragment from "./fragment";
import { prisma } from "generated/client";
import config from "config";
import jwt from "jsonwebtoken";
import { AUTH_COOKIE_NAME } from "constants";

/*
 * Express middleware for Authentication. Grabs a JWT
 * from the authorization header or cookie and decodes it,
 * setting a userId on the req.session. This will be
 * undefined if no token was found or invalid.
 * @param {Object} req The express request.
 * @param {Object} res The express response.
 * @param {Function} next Calls the next middleware.
 */
export function authenticateRequest() {
  return async function(req, res, next) {
    // Set up the session object on every request.
    req.session = {};

    // Grab token from header, or cookie.
    const authHeader = (req.get("Authorization") || "").replace("Bearer ", "");
    const token = authHeader || req.cookies[AUTH_COOKIE_NAME];

    // Decode the JWT.
    const passphrase = config.get("jwtPassphrase");
    const { uuid: id } = await new Promise(resolve => {
      jwt.verify(token, passphrase, (err, decoded) => {
        if (err) return resolve({});
        return resolve(decoded);
      });
    });

    // If we have a userId, set the user on the session.
    if (id) {
      const user = await prisma.user({ id }).$fragment(fragment);
      req.session.user = user;
    }

    // Pass execution downstream.
    next();
  };
}
