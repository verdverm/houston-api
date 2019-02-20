import fragment from "./fragment";
import { prisma } from "generated/client";
import { checkPermission } from "rbac";
import { addFragmentToInfo } from "graphql-binding";
import { compact } from "lodash";
import { ENTITY_WORKSPACE, ENTITY_DEPLOYMENT } from "constants";

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

  // Perform extra checks here if passing in releaseName,
  // because it passes right through the auth directive.
  if (workspaceUuid) {
    checkPermission(
      ctx.user,
      "workspace.deployments.list",
      ENTITY_WORKSPACE.toLowerCase(),
      workspaceUuid
    );
  }

  if (deploymentUuid) {
    checkPermission(
      ctx.user,
      "deployment.config.get",
      ENTITY_DEPLOYMENT.toLowerCase(),
      deploymentUuid
    );
  }

  if (releaseName) {
    const deploymentId = await prisma
      .deployment({ releaseName: args.releaseName })
      .id();

    checkPermission(
      ctx.user,
      "deployment.config.get",
      ENTITY_DEPLOYMENT.toLowerCase(),
      deploymentId
    );
  }

  // Build the deployments query.
  const query = deploymentsQuery(args, ctx);

  // Run final query
  return await ctx.db.query.deployments(
    query,
    addFragmentToInfo(info, fragment)
  );
}

/*
 * Build the deployments query based on args.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {Object} The deployments query.
 */
export function deploymentsQuery(args, ctx) {
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
    query.where.AND.push({ releaseName });
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

  // Return the final query.
  return query;
}
