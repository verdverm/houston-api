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
  const { workspaceUuid } = args;

  // Build query structure.
  const query = { where: {} };

  // If we have a workspaceUuid, add to filter, else use userId.
  if (workspaceUuid) {
    query.where = { id: workspaceUuid };
  } else {
    const workspaceIds = ctx.user.roleBindings.map(rb =>
      rb.workspace ? rb.workspace.id : null
    );
    query.where = { id_in: compact(workspaceIds) };
  }

  // Create a fragment to ensure that we always return the id and deployments,
  // no matter what a user requests.
  const fragment = `fragment EnsureFields on Workspace { id, deployments }`;

  // Get the workspaces, using their ids and passing the user specified selection set.
  return await ctx.db.query.workspaces(
    query,
    addFragmentToInfo(info, fragment)
  );
}
