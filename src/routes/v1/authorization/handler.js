import { hasPermission, fragments } from "rbac";
import { prisma } from "generated/client";
import log from "logger";
import { createJWT } from "jwt";
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
  if (
    monitoringSubdomain &&
    (await hasPermission(user, "system.monitoring.view"))
  ) {
    log.info(`Authorizing request to ${originalUrl}`);
    return res.sendStatus(200);
  }

  // Check if we're accessing a deployment level service.
  const matches = subdomain.match(/^([\w]+-[\w]+-[\d]+)-(airflow|flower)$/);
  if (matches) {
    // Get the deploymentId for the parsed releaseName.
    const deployment = await prisma
      .deployment({ releaseName: matches[1] })
      .$fragment(fragments.deployment);

    // Check if we have deployment level access to it.
    const airflowRoles = mapLocalRolesToAirflow(user, deployment);

    // If we have permission, authorize it.
    if (airflowRoles.length > 0) {
      const jwt = exports.airflowJWT(user, airflowRoles, hostname);
      res.set("Authorization", "Bearer " + jwt);
      return res.sendStatus(200);
    }
  }

  // If we made it this far, deny the request.
  log.info(`Denying request to ${originalUrl}`);
  return res.sendStatus(401);
}

export function airflowJWT(user, roles, hostname) {
  const token = createJWT({
    // Make sure that we can't use tokens from one deployment against
    // another somehow.
    aud: hostname,
    sub: user.id,
    roles: roles,
    email: user.username,
    full_name: user.fullName
  });
  return token;
}

export function mapLocalRolesToAirflow(user, deployment) {
  if (hasPermission(user, "deployment.airflow.op", deployment)) return ["Op"];
  if (hasPermission(user, "deployment.airflow.user", deployment))
    return ["User"];
  if (hasPermission(user, "deployment.airflow.view", deployment))
    return ["Viewer"];

  return [];
}
