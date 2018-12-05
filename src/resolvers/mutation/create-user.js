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

  // If it's not the first and we're not allowing public signups, check for invite.
  if (!isFirst && !allowPublicSignups) {
    if (!args.inviteToken) throw new PublicSignupsDisabledError();

    // Grab the invite token.
    const token = ctx.db.query.inviteTokensConnection(
      { where: { token: args.token } },
      `{ workspace { id } }`
    );

    // Throw error if token not found.
    if (!token) throw new InviteTokenNotFoundError();

    // Throw error if email does not match.
    if (token.email !== args.email) throw new InviteTokenEmailError();
  }

  // Check to see if we are requiring email confirmations.
  const emailConfirm = await ctx.db.query.systemSetting(
    { where: { id: SYSTEM_SETTING_USER_CONFIRMATION } },
    `{ value }`
  );

  // Determine default status.
  const defaultStatus = emailConfirm ? USER_STATUS_PENDING : USER_STATUS_ACTIVE;

  // Generate an verification token.
  const emailToken = shortid.generate();

  // Hash password.
  const password = await bcrypt.hash(args.password, 10);

  // Create the user records.
  const user = await ctx.db.mutation.createUser(
    {
      data: {
        username: args.username,
        fullName: args.fullName,
        status: defaultStatus,
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
    },
    `{ id }`
  );

  // Return our new user id.
  return { userId: user.id };
}
