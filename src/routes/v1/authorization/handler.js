import { hasPermission } from "rbac";
import { prisma } from "generated/client";
import log from "logger";
import { ENTITY_DEPLOYMENT } from "constants";
import url from "url";

/*
 * Handle authorization requests from the NGINX ingress controller.
 * @param {Object} req The request.
 * @param {Object} res The response.
 */
export default async function(req, res) {
  const { user } = req.session;
  if (!user) return res.sendStatus(401);

  // Parse out some variables.
  const originalUrl = req.get("x-original-url");
  const { hostname } = url.parse(originalUrl);
  const [subdomain] = hostname.split(".");

  // If we're accessing a monitoring service and we have permission, allow it.
  const monitoringSubdomain = /^(grafana|kibana)$/.test(subdomain);
  if (monitoringSubdomain && hasPermission(user, "global.monitoring.view")) {
    log.info(`Authorizing request to ${originalUrl}`);
    return res.sendStatus(200);
  }

  // Check if we're accessing a deployment level service.
  const matches = subdomain.match(/^([\w]+-[\w]+-[\d]+)-(airflow|flower)$/);
  if (matches) {
    // Get the deploymentId for the parsed releaseName.
    const deploymentId = await prisma
      .deployment({ releaseName: matches[1] })
      .id();

    // Check if we have deployment level access to it.
    const hasDeploymentPermission = hasPermission(
      user,
      "user.deployment.update",
      ENTITY_DEPLOYMENT.toLowerCase(),
      deploymentId
    );

    // If we have permission, authorize it.
    if (hasDeploymentPermission) {
      log.info(`Authorizing request to ${originalUrl}`);
      return res.sendStatus(200);
    }
  }

  // If we made it this far, deny the request.
  log.info(`Denying request to ${originalUrl}`);
  return res.sendStatus(401);
}
