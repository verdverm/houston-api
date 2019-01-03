import {
  PublicSignupsDisabledError,
  InviteTokenNotFoundError,
  InviteTokenEmailError
} from "errors";
import config from "config";
import bcrypt from "bcryptjs";
import shortid from "shortid";
import {
  WORKSPACE_ADMIN,
  SYSTEM_ADMIN,
  USER_STATUS_PENDING,
  USER_STATUS_ACTIVE
} from "constants";

/*
 * Create a new user. This is the singnup mutation.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {AuthToken} The auth token.
 */
export default async function createUser(parent, args, ctx) {
  // Check to see if we are requiring email confirmations.
  const emailConfirmation = config.get("emailConfirmation");

  // Check to see if we are allowing public signups.
  const publicSignups = config.get("publicSignups");

  // Check to see if this is the first signup.
  const first = await ctx.db.query.usersConnection(
    {},
    `{ aggregate { count } }`
  );

  // If no users found, this is first signup.
  const isFirst = first.aggregate.count === 0;

  // If it's not the first signup and we're not allowing public signups, check for invite.
  if (!isFirst && !publicSignups && !args.inviteToken) {
    throw new PublicSignupsDisabledError();
  }

  // Validate our invite token if exists.
  const inviteToken = validateInviteToken(args, ctx);

  // Username can fall back to email.
  const username = args.username || args.email;

  // Full name is sent in on profile and can fall back to empty string.
  const fullName = (args.profile || {}).fullName || "";

  // Hash password.
  const password = await bcrypt.hash(args.password, 10);

  // Determine default status.
  const status = emailConfirmation ? USER_STATUS_PENDING : USER_STATUS_ACTIVE;

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
          primary: true,
          verified: !emailConfirmation,
          token: emailToken
        }
      },
      localCredential: {
        create: {
          password
        }
      },
      profile: {}
    }
  };

  // Add the default rolebinding to the users personal workspace.
  const roleBindings = [
    {
      role: WORKSPACE_ADMIN,
      workspace: {
        create: {
          active: true,
          label: defaultWorkspaceLabel(args),
          description: defaultWorkspaceDescription(args)
        }
      }
    }
  ];

  // If we have an invite token, add user to the originating workspace.
  if (inviteToken && inviteToken.workspace) {
    roleBindings.push({
      role: WORKSPACE_ADMIN,
      workspace: {
        connect: {
          id: inviteToken.workspace.id
        }
      }
    });
  }

  // Add admin role if first signup.
  if (isFirst) {
    roleBindings.push({
      role: SYSTEM_ADMIN
    });
  }

  // Add the rolebindings to the mutation.
  mutation.data.roleBindings = { create: roleBindings };

  // Create the user records.
  const user = await ctx.db.mutation.createUser(mutation, `{ id }`);

  // Return our new user id, AuthUser resolver takes it from there.
  return { userId: user.id };
}

/*
 * Validates that an invite token is valid, throws otherwise.
 * @param {GraphQLArguments} args The graphql arguments.
 * @param {GraphQLContext} ctx The graphql context.
 * @return {InviteToken} The invite token.
 */
export function validateInviteToken(args, ctx) {
  // Return early if no token found.
  if (!args.inviteToken) return;

  // Grab the invite token.
  const token = ctx.db.query.inviteTokensConnection(
    { where: { token: args.inviteToken } },
    `{ workspace { id }, email }`
  );

  // Throw error if token not found.
  if (!token) throw new InviteTokenNotFoundError();

  // Throw error if email does not match.
  if (token.email !== args.email) throw new InviteTokenEmailError();

  // Return validated token.
  return token;
}

/*
 * Generate default workspace label.
 * @param {Object} args The args for the mutation.
 * @return {String} The workspace label.
 */
export function defaultWorkspaceLabel(args) {
  const labelName = (args.profile || {}).fullName || args.username;
  return labelName ? `${labelName}'s Workspace` : "Default Workspace";
}

/*
 * Generate default workspace description.
 * @param {Object} args The args for the mutation.
 * @return {String} The workspace description.
 */
export function defaultWorkspaceDescription(args) {
  const descName = (args.profile || {}).fullName || args.email || args.username;
  return descName ? `Default workspace for ${descName}` : "Default Workspace";
}
