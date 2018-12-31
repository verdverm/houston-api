import config from "configuration";
import { curry, merge } from "lodash";

/*
 * Get details on possible deployment configurations.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {AuthConfig} The auth config.
 */
export default async function deploymentConfig() {
  const astroUnit = config.get("deployments.astroUnit");
  const maxExtraAu = config.get("deployments.maxExtraAu");
  const executors = config.get("deployments.executors");
  const latestVersion = config.get("helm.releaseVersion");

  const components = config.get("deployments.components");

  const defaultsFn = curry(mapResources)(astroUnit, "default");
  const defaults = merge(...components.map(defaultsFn));

  const limitsFn = curry(mapResources)(astroUnit, "limit");
  const limits = merge(...components.map(limitsFn));

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

  const merged = merge(resources, ...extras);

  return { [comp.name]: merged };
}
