import validateEnvironment from "./environment";
import validateResources from "./resources";
import validateProperties from "./properties";
import validateExistence from "./existence";
import { auToResources } from "deployments/config";
import config from "config";

/*
 * Validate deployment args. Throws if there is an issue.
 * @param {Object} args The graphql arguments.
 */
export default async function validate(workspaceId, args, deploymentId) {
  // Validate environment variables.
  validateEnvironment(args.env);

  // Validate resources.
  const { astroUnit, maxPodAu } = config.get("deployments");
  const max = auToResources(astroUnit, maxPodAu, false);
  validateResources(args.config, max);

  // Validate properties.
  validateProperties(args.properties);

  // Ensure this deployment label does not exist.
  args.label &&
    (await validateExistence(workspaceId, args.label, deploymentId));
}
