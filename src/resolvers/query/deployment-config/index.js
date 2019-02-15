import { defaultResources } from "deployments/config";
import config from "config";
import { keyBy } from "lodash";

/*
 * Get details on possible deployment configurations.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {DeploymentConfig} The deployment config.
 */
export default async function deploymentConfig() {
  // Get astroUnit object directly from config.
  const astroUnit = config.get("deployments.astroUnit");

  // Get maximum extra AU directly from config.
  const maxExtraAu = config.get("deployments.maxExtraAu");

  // Generate defaults.
  const defaults = defaultResources("default", false);

  // Generate limits.
  const limits = defaultResources("limit", false);

  // Get list of executors, transform to object, keyed by name.
  const executors = keyBy(config.get("deployments.executors"), "name");

  // Get current version of platform, passed from helm.
  const latestVersion = config.get("helm.releaseVersion");

  // Are we deploying the platform and airflow into the same namespace (true),
  // or creating a new namespace for each deployment (false)
  const singleNamespace = config.get("helm.singleNamespace");

  return {
    defaults,
    limits,
    astroUnit,
    maxExtraAu,
    executors,
    latestVersion,
    singleNamespace
  };
}
