import {
  generateNamespace,
  generateEnvironmentSecretName
} from "deployments/naming";
import { envObjectToArray } from "deployments/config";
import { propertiesArrayToObject } from "utilities";
import { get } from "lodash";
import config from "config";
import { AIRFLOW_EXECUTOR_CELERY } from "constants";

export function urls(parent) {
  const { config: cfg, releaseName } = parent;
  const baseDomain = config.get("helm.baseDomain");

  // All deployments will have the airflow url.
  const urls = [
    {
      type: `airflow`,
      url: `https://${releaseName}-airflow.${baseDomain}/admin`
    }
  ];

  // Celery deployments will also have flower url.
  if (cfg.executor === AIRFLOW_EXECUTOR_CELERY) {
    urls.push({
      type: `flower`,
      url: `https://${releaseName}-flower.${baseDomain}`
    });
  }

  return urls;
}

export async function env(parent, args, ctx) {
  const { releaseName } = parent;

  // Query commander for the environment variables.
  const envs = await ctx.commander.request("getSecret", {
    namespace: generateNamespace(releaseName),
    name: generateEnvironmentSecretName(releaseName)
  });

  // Transform the returned object into an array.
  return envObjectToArray(get(envs, "secret.data"));
}

export async function properties(parent) {
  return propertiesArrayToObject(parent.properties);
}

export default { urls, env, properties };
