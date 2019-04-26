import fragment from "./fragment";
import {
  hasPermission,
  checkPermission,
  fragments as rbacFragments
} from "rbac";
import { addFragmentToInfo } from "graphql-binding";

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
    const entity = await ctx.db.query.workspace(
      { where: { id: workspaceUuid } },
      rbacFragments.workspace
    );
    checkPermission(ctx.user, "workspace.deployments.list", entity);
  }
  if (deploymentUuid) {
    const entity = await ctx.db.query.deployment(
      { where: { id: deploymentUuid } },
      rbacFragments.deployment
    );
    checkPermission(ctx.user, "deployment.config.get", entity);
  }

  if (releaseName) {
    const entity = await ctx.db.query.deployment(
      { where: { releaseName } },
      rbacFragments.deployment
    );
    checkPermission(ctx.user, "deployment.config.get", entity);
  }

  // Build the deployments query.
  const query = await deploymentsQuery(args, ctx);

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
    const deploymentIds = new Set();
    const workspaceIds = new Set();
    for (let rb of ctx.user.roleBindings) {
      if (
        rb.deployment &&
        hasPermission(ctx.user, "deployment.config.get", rb.deployment)
      ) {
        deploymentIds.add(rb.deployment.id);
      } else if (
        rb.workspace &&
        hasPermission(ctx.user, "workspace.deployments.list", rb.workspace)
      ) {
        workspaceIds.add(rb.workspace.id);
      }
    }
    const workspaceTerm = {
      OR: [...workspaceIds].map(id => {
        return { workspace: { id } };
      })
    };
    if (deploymentIds.size && workspaceTerm.OR.length) {
      query.where = {
        OR: [{ id_in: [...deploymentIds] }, ...workspaceTerm.OR]
      };
    } else if (workspaceTerm.OR.length) {
      query.where = workspaceTerm;
    } else {
      query.where.AND.push({ id_in: [...deploymentIds] });
    }
  }

  // Return the final query.
  return query;
}
