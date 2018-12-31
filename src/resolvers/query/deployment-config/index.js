import config from "configuration";
import { curry, keyBy, merge } from "lodash";

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

  // Get list of components and AU requirements directly from config.
  const components = config.get("deployments.components");

  // Generate defaults.
  const defaultsFn = curry(mapResources)(astroUnit, "default");
  const defaults = merge(...components.map(defaultsFn));

  // Generate limits.
  const limitsFn = curry(mapResources)(astroUnit, "limit");
  const limits = merge(...components.map(limitsFn));

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

/*
 * HOF to help create mergeable resources
 * @param {Object} Astro unit config.
 * @param {String} Default/Limit.
 * @param {String} Component name.
 * @return {Object} Resources for single component.
 */
export function mapResources(au, auType, comp) {
  const requests = {
    cpu: au.cpu * comp.au[auType],
    memory: au.memory * comp.au[auType]
  };

  const resources = {
    requests,
    limits: requests
  };

  const extras = !comp.extra
    ? []
    : comp.extra.map(extra => {
        return {
          [extra.name]: extra[auType]
        };
      });

  const merged = merge({ resources }, ...extras);

  return { [comp.name]: merged };
}
