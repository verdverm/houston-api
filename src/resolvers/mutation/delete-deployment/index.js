import { generateNamespace } from "deployments/naming";
import config from "config";

/*
 * Delete a deployment.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {Deployment} The deleted Deployment.
 */
export default async function deleteDeployment(parent, args, ctx, info) {
  // Delete the record from the database.
  const deployment = await ctx.db.mutation.deleteDeployment(
    {
      where: { id: args.deploymentUuid }
    },
    info
  );

  // Delete deployment from helm.
  await ctx.commander.request("deleteDeployment", {
    releaseName: deployment.releaseName,
    namespace: generateNamespace(deployment.releaseName),
    deleteNamespace: !config.get("helm.singleNamespace")
  });

  return deployment;
}
