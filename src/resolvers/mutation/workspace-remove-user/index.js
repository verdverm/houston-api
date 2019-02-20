import fragment from "./fragment";
import { addFragmentToInfo } from "graphql-binding";

/*
 * Remove a user from a workspace.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {Workspace} The Workspace.
 */
export default async function workspaceRemoveUser(parent, args, ctx, info) {
  // Pull out some args, ignoring email - remove later.
  const { userUuid, workspaceUuid } = args;

  // Remove the RoleBinding.
  const where = { workspace: { id: workspaceUuid }, user: { id: userUuid } };
  await ctx.db.mutation.deleteManyRoleBindings({ where });

  // Return the workspace.
  return ctx.db.query.workspace(
    { where: { id: workspaceUuid } },
    addFragmentToInfo(info, fragment)
  );
}
