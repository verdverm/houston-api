import { compact } from "lodash";
import { addFragmentToInfo } from "graphql-binding";

/*
 * Get list of workspaces for user.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @param {Object} info The graphql info.
 * @return {[]Workspace} List of workspaces.
 */
export default async function workspaces(parent, args, ctx, info) {
  // Get a list of workspace ids that this user has access to.
  const workspaceIds = ctx.user.roleBindings.map(rb =>
    rb.workspace ? rb.workspace.id : null
  );

  // Create a fragment to ensure that we always return the id, no matter what a user requests.
  const fragment = `fragment EnsureId on Workspace { id, deployments }`;

  // Get the workspaces, using their ids and passing the user specified selection set.
  const workspaces = await ctx.db.query.workspaces(
    {
      where: { id_in: compact(workspaceIds) }
    },
    addFragmentToInfo(info, fragment)
  );

  return workspaces;
}
