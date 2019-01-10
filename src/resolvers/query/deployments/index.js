import { addFragmentToInfo } from "graphql-binding";
import { compact } from "lodash";

/*
 * Get list of deployments for a workspace.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {[]Deployment} List of Deployments.
 */
export default async function deployments(parent, args, ctx, info) {
  // Pull out some args.
  const { deploymentUuid, releaseName, workspaceUuid } = args;

  // Build query structure.
  const query = { where: { AND: [] } };

  // If we have deploymentId, add to filter.
  if (deploymentUuid) {
    query.where.AND.push({ id: deploymentUuid });
  }

  // If we have releaseName, add to filter.
  if (releaseName) {
    query.where.AND.push({ releaseName: releaseName });
  }

  // If we have workspaceUuid, add to filter.
  if (workspaceUuid) {
    query.where.AND.push({ workspace: { id: workspaceUuid } });
  }

  if (!(deploymentUuid || releaseName || workspaceUuid)) {
    // Get a list of deployment ids that this user can access.
    const deploymentIds = ctx.user.roleBindings.map(rb =>
      rb.deployment ? rb.deployment.id : null
    );
    query.where.AND.push({ id_in: compact(deploymentIds) });
  }

  // Create a fragment to ensure that we always return the id.
  // We also need properties, because Houston 1 defined the schema
  // as a JSON, so it does not corretly map to the stronger typed backend.
  const fragment = `fragment EnsureFields on Deployment { id, workspace { id }, properties { key, value } }`;

  // Run final query
  return await ctx.db.query.deployments(
    query,
    addFragmentToInfo(info, fragment)
  );
}
