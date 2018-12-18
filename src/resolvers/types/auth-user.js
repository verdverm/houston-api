import config from "config";
import jwt from "jsonwebtoken";
import ms from "ms";

// Grab the user object for this id.
export function user(parent, args, ctx, info) {
  return ctx.db.query.user({ where: { id: parent.userId } }, info);
}

// Generate a JWT using the user id.
export function token(parent, args, ctx) {
  // Create our JWT.
  const millis = config.get("authDuration");

  // Create the payload.
  const payload = { uuid: parent.userId };
  const token = jwt.sign(payload, config.get("jwtPassphrase"), {
    expiresIn: ms(millis),
    mutatePayload: true
  });

  // Set the cookie.
  ctx.res.cookie("astronomer_auth", token, {
    domain: `.${config.get("helm.baseDomain")}`,
    path: "/",
    expires: new Date(millis),
    secure: true
  });

  // Return in the legacy format.
  return { value: token, payload };
}

// Return empty permissions currently.
export function permissions() {
  return {};
}

// Return false by default.
export function isAdmin() {
  return false;
}

// Export AuthUser.
export default { user, token, permissions, isAdmin };
