import {
  PublicSignupsDisabledError,
  InviteTokenNotFoundError,
  InviteTokenEmailError
} from "../errors";
import bcrypt from "bcryptjs";
import shortid from "shortid";
import {
  SYSTEM_SETTING_PUBLIC_SIGNUP,
  SYSTEM_SETTING_USER_CONFIRMATION,
  USER_STATUS_PENDING,
  USER_STATUS_ACTIVE
} from "constants";

function validateInviteToken(ctx, args) {
  // Return early if no token found.
  if (!args.inviteToken) return;

  // Grab the invite token.
  const token = ctx.db.query.inviteTokensConnection(
    { where: { token: args.token } },
    `{ workspace { id }, email }`
  );

  // Throw error if token not found.
  if (!token) throw new InviteTokenNotFoundError();

  // Throw error if email does not match.
  if (token.email !== args.email) throw new InviteTokenEmailError();

  // Return validated token.
  return token;
}

// Create a new user. This is the singnup mutation.
export default async function createUser(parent, args, ctx) {
  // Check to see if this is the first signup.
  const first = await ctx.db.query.usersConnection(
    {},
    `{ aggregate { count } }`
  );

  // If no users found, this is first signup.
  const isFirst = first.aggregate.count === 0;

  // Check to see if we are allowing public signups.
  const publicSignup = await ctx.db.query.systemSetting(
    { where: { id: SYSTEM_SETTING_PUBLIC_SIGNUP } },
    `{ value }`
  );

  // Parse string to boolean.
  const allowPublicSignups = JSON.parse(publicSignup.value);

  // If it's not the first signup and we're not allowing public signups, check for invite.
  if (!isFirst && !allowPublicSignups && !args.inviteToken) {
    throw new PublicSignupsDisabledError();
  }

  // Validate our invite token if exists.
  const token = validateInviteToken(ctx, args);

  // Username can fall back to email.
  const username = args.username || args.email;

  // Full name is sent in on profile and can fall back to empty string.
  const fullName = (args.profile || {}).fullName || "";

  // Hash password.
  const password = await bcrypt.hash(args.password, 10);

  // Check to see if we are requiring email confirmations.
  const emailConfirm = await ctx.db.query.systemSetting(
    { where: { id: SYSTEM_SETTING_USER_CONFIRMATION } },
    `{ value }`
  );

  // Determine default status.
  const status = emailConfirm ? USER_STATUS_PENDING : USER_STATUS_ACTIVE;

  // Generate an verification token.
  const emailToken = shortid.generate();

  // Create our base mutation.
  const mutation = {
    data: {
      username,
      fullName,
      status,
      emails: {
        create: {
          address: args.email,
          main: true,
          verified: !emailConfirm,
          token: emailToken
        }
      },
      localCredential: {
        create: {
          password
        }
      }
    }
  };

  // If we have an invite token, add user to the originating workspace.
  if (token && token.workspace) {
    mutation.data.workspaces = {};
  }

  // Create the user records.
  const user = await ctx.db.mutation.createUser(mutation, `{ id }`);

  // Return our new user id.
  return { userId: user.id };
}
