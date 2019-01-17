import {
  PublicSignupsDisabledError,
  InviteTokenNotFoundError,
  InviteTokenEmailError
} from "errors";
import { prisma } from "generated/client";
import config from "config";
import shortid from "shortid";
import {
  WORKSPACE_ADMIN,
  SYSTEM_ADMIN,
  USER_STATUS_PENDING,
  USER_STATUS_ACTIVE
} from "constants";

/*
 * Centralized helper method to create new user in the system.
 */
export async function createUser(opts) {
  // Pull out some options.
  const { username, fullName, email, inviteToken: rawInviteToken } = opts;
  const inviteToken = await validateInviteToken(rawInviteToken, email);

  // Grab some configuration.
  const emailConfirmation = config.get("emailConfirmation");
  const publicSignups = config.get("publicSignups");

  // Check if this the first signup.
  const first = await isFirst();

  // If it's not the first signup and we're not allowing public signups, check for invite.
  if (!first && !publicSignups && !inviteToken) {
    throw new PublicSignupsDisabledError();
  }

  // Determine default status.
  const status = emailConfirmation ? USER_STATUS_PENDING : USER_STATUS_ACTIVE;

  // Generate an verification token.
  const emailToken = shortid.generate();

  // Generate the role bindings.
  const roleBindings = generateRoleBindings(first, inviteToken, opts);

  // Create our base mutation.
  const mutation = {
    username,
    status,
    fullName,
    emails: {
      create: {
        address: email,
        primary: true,
        verified: !emailConfirmation,
        token: emailToken
      }
    },
    roleBindings
  };

  // If we have an invite token, delete it.
  if (inviteToken) {
    await prisma.deleteInviteToken({
      where: { id: inviteToken.id }
    });
  }

  // Run the mutation and return id.
  return prisma.createUser(mutation).id();
}

/*
 * Check if we have any users in the system yet.
 * @return {Promise<Boolean> User count is 0
 */
export async function isFirst() {
  const count = await prisma
    .usersConnection({})
    .aggregate()
    .count();

  return count == 0;
}

/*
 * Create the role bindings for a new user.
 * @param {Boolean} first If this is the first user.
 * @param {Object} inviteToken An invite token.
 */
export function generateRoleBindings(first, inviteToken, opts) {
  // Add the default rolebinding to the users personal workspace.
  const roleBindings = [
    {
      role: WORKSPACE_ADMIN,
      workspace: {
        create: {
          active: true,
          label: defaultWorkspaceLabel(opts),
          description: defaultWorkspaceDescription(opts)
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
  if (first) {
    roleBindings.push({
      role: SYSTEM_ADMIN
    });
  }

  // Return combined role bindings.
  return { create: roleBindings };
}

/*
 * Validates that an invite token is valid, throws otherwise.
 * @param {String} inviteToken An invite token.
 * @param {String} email The email of the incoming user.
 * @return {InviteToken} The invite token.
 */
export async function validateInviteToken(inviteToken, email) {
  // Return early if no token found.
  if (!inviteToken) return;

  // Grab the invite token.
  const token = await prisma.inviteTokensConnection(
    { where: { token: inviteToken } },
    `{ workspace { id }, email }`
  );

  // Throw error if token not found.
  if (!token) throw new InviteTokenNotFoundError();

  // Throw error if email does not match.
  if (token.email !== email) throw new InviteTokenEmailError();

  // Return validated token.
  return token;
}

/*
 * Generate default workspace label.
 * @param {Object} args The args for the mutation.
 * @return {String} The workspace label.
 */
export function defaultWorkspaceLabel(opts) {
  const labelName = opts.fullName || opts.username;
  return labelName ? `${labelName}'s Workspace` : "Default Workspace";
}

/*
 * Generate default workspace description.
 * @param {Object} opts The opts for the mutation.
 * @return {String} The workspace description.
 */
export function defaultWorkspaceDescription(opts) {
  const descName = opts.fullName || opts.email || opts.username;
  return descName ? `Default workspace for ${descName}` : "Default Workspace";
}
