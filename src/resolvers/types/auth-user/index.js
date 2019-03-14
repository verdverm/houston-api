import fragment from "./fragment";
import { createAuthJWT, setJWTCookie } from "jwt";
import { addFragmentToInfo } from "graphql-binding";
import { USER_STATUS_ACTIVE } from "constants";

// Grab the user object for this id.
export function user(parent, args, ctx, info) {
  return ctx.db.query.user(
    { where: { id: parent.userId } },
    addFragmentToInfo(info, fragment)
  );
}

// Generate a JWT using the user id.
export async function token(parent, args, ctx) {
  const user = await ctx.db.query.user(
    { where: { id: parent.userId } },
    `{ status }`
  );

  if (user.status != USER_STATUS_ACTIVE) {
    //  User is not active, so they can't log in
    return null;
  }

  // Create our JWT.
  const { token, payload } = createAuthJWT(parent.userId);

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
