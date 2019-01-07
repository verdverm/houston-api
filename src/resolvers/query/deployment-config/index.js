import { resources } from "deployments/config";
import config from "config";
import { keyBy } from "lodash";

/*
 * Get details on possible deployment configurations.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {AuthConfig} The auth config.
 */
export default async function deploymentConfig() {
  // Get astroUnit object directly from config.
  const astroUnit = config.get("deployments.astroUnit");

  // Get maximum extra AU directly from config.
  const maxExtraAu = config.get("deployments.maxExtraAu");

  // Generate defaults.
  const defaults = resources("default", false);

  // Generate limits.
  const limits = resources("limit", false);

  // Get list of executors, transform to object, keyed by name.
  const executors = keyBy(config.get("deployments.executors"), "name");

  // Get current version of platform, passed from helm.
  const latestVersion = config.get("helm.releaseVersion");

  return {
    defaults,
    limits,
    astroUnit,
    maxExtraAu,
    executors,
    latestVersion
  };
}
