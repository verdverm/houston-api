import { decodeJWT } from "jwt";
import { getUserWithRoleBindings } from "rbac";
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
    const { uuid: id } = await decodeJWT(token);

    // If we have a userId, set the user on the session.
    if (id) req.session.user = await getUserWithRoleBindings(id);

    // Pass execution downstream.
    next();
  };
}
