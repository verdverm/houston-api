import { createUser as _createUser } from "users";
import { addMember } from "mailchimp";
import { get } from "lodash";
import bcrypt from "bcryptjs";

/*
 * Create a new user. This is the signup mutation.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {AuthToken} The auth token.
 */
export default async function createUser(parent, args, ctx) {
  // Username can fall back to email.
  const username = args.username || args.email;

  // Full name is sent in on profile and can fall back to empty string.
  const fullName = get(args, "profile.fullName");

  // Hash password.
  const password = await bcrypt.hash(args.password, 10);

  // Create the user and nested relations.
  const userId = await _createUser({
    username,
    fullName,
    email: args.email,
    inviteToken: args.inviteToken
  });

  // Create the local credential and connect to user.
  await ctx.db.mutation.createLocalCredential({
    data: {
      password,
      user: { connect: { id: userId } }
    }
  });

  // Add user to Mailchimp list for onboarding.
  await addMember(args.email);

  return { userId };
}
