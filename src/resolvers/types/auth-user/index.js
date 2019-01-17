import fragment from "./fragment";
import { createJWT, setJWTCookie } from "jwt";
import { addFragmentToInfo } from "graphql-binding";

// Grab the user object for this id.
export function user(parent, args, ctx, info) {
  return ctx.db.query.user(
    { where: { id: parent.userId } },
    addFragmentToInfo(info, fragment)
  );
}

// Generate a JWT using the user id.
export function token(parent, args, ctx) {
  // Create our JWT.
  const { token, payload } = createJWT(parent.userId);

  // Set the cookie.
  setJWTCookie(ctx.res, token);

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
