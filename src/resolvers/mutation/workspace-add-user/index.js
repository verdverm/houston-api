import fragment from "./fragment";
import { UserInviteExistsError } from "errors";
import { gt, first, size } from "lodash";
import shortid from "shortid";
import { addFragmentToInfo } from "graphql-binding";
import { WORKSPACE_ADMIN } from "constants";

/*
 * Add a user to a workspace.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {User} The updated Workspace.
 */
export default async function workspaceAddUser(parent, args, ctx, info) {
  // Pull out some args.
  const { email, workspaceUuid } = args;

  // Check for user by incoming email arg.
  const user = first(
    await ctx.db.query.users(
      { where: { emails_some: { address: email } } },
      `{ id }`
    )
  );

  // If we already have a user, create the role binding to the workspace.
  if (user) {
    await ctx.db.mutation.createRoleBinding({
      data: {
        role: WORKSPACE_ADMIN,
        user: { connect: { id: user.id } },
        workspace: { connect: { id: workspaceUuid } }
      }
    });
  }

  if (!user) {
    // Check if we have an invite for incoming email and user.
    const existingInvites = await ctx.db.query.inviteTokens(
      {
        where: { email, workspace: { id: workspaceUuid } }
      },
      `{ id }`
    );
    if (gt(size(existingInvites), 0)) throw new UserInviteExistsError();

    // Crate the invite token if we didn't already have one.
    await ctx.db.mutation.createInviteToken({
      data: {
        email,
        token: shortid.generate(),
        workspace: { connect: { id: workspaceUuid } }
      }
    });
  }

  // Return the workspace.
  return ctx.db.query.workspace(
    { where: { id: workspaceUuid } },
    addFragmentToInfo(info, fragment)
  );
}
