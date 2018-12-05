import config from "config";
import jwt from "jsonwebtoken";

// Grab the user object for this id.
export function user(parent, args, ctx, info) {
  return ctx.db.query.user({ where: { id: parent.userId } }, info);
}

// Generate a JWT using the user id.
export function token(parent) {
  // Create our JWT.
  const payload = { uuid: parent.userId };
  const token = jwt.sign(payload, config.get("jwtPassphrase"), {
    expiresIn: `1 days`,
    mutatePayload: true
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
