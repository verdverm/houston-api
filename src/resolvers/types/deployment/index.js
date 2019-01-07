import { AIRFLOW_EXECUTOR_CELERY } from "constants";

export function urls(parent, args, ctx) {
  const { config, releaseName } = parent;
  const baseDomain = ctx.config.get("helm.baseDomain");

  const urls = [
    {
      type: `airflow`,
      url: `https://${releaseName}-airflow.${baseDomain}/admin`
    }
  ];

  if (config.executor === AIRFLOW_EXECUTOR_CELERY) {
    urls.push({
      type: `flower`,
      url: `https://${releaseName}-flower.${baseDomain}`
    });
  }

  return urls;
}

export function env() {}

export default { urls, env };
