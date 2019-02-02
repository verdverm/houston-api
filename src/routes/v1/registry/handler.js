import { prisma } from "generated/client";
import { checkPermission, getUserWithRoleBindings } from "rbac";
import log from "logger";
import { InvalidCredentialsError } from "errors";
import { decodeJWT } from "jwt";
import { createDockerJWT } from "registry/jwt";
import bcrypt from "bcryptjs";
import { compact, first, isArray } from "lodash";
import { ENTITY_DEPLOYMENT } from "constants";

// List of expected registry codes.
const REGISTRY_CODES = {
  UNKNOWN: "NAME_UNKNOWN",
  UNAUTHORIZED: "UNAUTHORIZED",
  DENIED: "DENIED"
};

/*
 * Handle authorization requests from the docker registry.
 * @param {Object} req The request.
 * @param {Object} res The response.
 */
export default async function(req, res) {
  log.info("Processing registry authorization");

  // If we don't have an original URL, it's a mistake. Can't proceed.
  const originalUri = req.get("x-original-uri");
  if (!originalUri) {
    return sendError(
      res,
      REGISTRY_CODES.UNKNOWN,
      "Unknown registry service request"
    );
  }

  // Get the authorization header, fail if not found.
  const authorization = req.get("authorization");
  if (!authorization || authorization.substr(0, 5) !== "Basic") {
    return sendError(
      res,
      REGISTRY_CODES.UNAUTHORIZED,
      "No authorization credentials specified"
    );
  }

  // Pull authorization token out of headers and parse it.
  const token = authorization.substr(6);
  const [authUser, authPassword] = Buffer.from(token, "base64")
    .toString()
    .split(":");

  // Determine if this is a user triggered action, or from a running deployment.
  const isDeployment = await isDeploymentRegistryAuth(authUser, authPassword);
  const userId = isDeployment
    ? "registry"
    : (await decodeJWT(authPassword)).uuid;

  // JWT response payload.
  const payload = [];

  // Pull out the scope variable.
  const scope = req.query.scope;

  // Scope will not exist on a docker login (astro auth login).
  // It will exist for a code push (docker push) and when deployment pods
  // pull the image (docker pull).
  if (scope) {
    const { type, releaseName, image, actions } = first(
      compact((isArray(scope) ? scope : [scope]).map(parseScope))
    );

    if (!releaseName) {
      return sendError(
        res,
        REGISTRY_CODES.UNKNOWN,
        "Unknown scope, cannot determine repository or image"
      );
    }

    // This path is for a code push.
    if (!isDeployment) {
      log.info(`Checking permissions for ${userId} on ${releaseName}`);
      const user = await getUserWithRoleBindings(userId);
      const deploymentId = await prisma.deployment({ releaseName }).id();
      checkPermission(
        user,
        "user.deployment.update",
        ENTITY_DEPLOYMENT.toLowerCase(),
        deploymentId
      );
    }

    payload.push({ type, actions, name: `${releaseName}/${image}` });
  }

  // Create and respond with the JWT.
  const expiration = 3600;
  const dockerJWT = await createDockerJWT(userId, payload, expiration);
  res.json({
    token: dockerJWT,
    expires_in: expiration,
    issued_at: new Date().toISOString()
  });
}

/*
 * Parse a scope query string parameter from the registry.
 * @param {String} scope The user scope.
 * @return {Object} The parsed information.
 */
export function parseScope(scope) {
  const matches = scope.match(
    /(repository):([a-z]+-[a-z]+-[0-9]{0,4})\/(airflow):([a-z,]+)/
  );
  if (matches) {
    return {
      type: matches[1],
      releaseName: matches[2],
      image: matches[3],
      actions: matches[4].split(",")
    };
  }
}

/*
 * Check if token is legit.
 * @param {String} token The authorization token.
 */
// export async function isRegistryAuth(token) {
//   if (isPlatformRegistryAuth(token)) {
//     log.info("Platform registry auth");
//     return true;
//   }
//   if (await isDeploymentRegistryAuth(token)) {
//     log.info("Deployment registry auth");
//     return true;
//   }
// }

/*
 * Check if token is a platform token.
 * @param {String} token The authorization token.
 */
// export function isPlatformRegistryAuth(token) {
//   const registryAuth = config.get("registry.auth");
//   return !!find(registryAuth.auths, value => value.auth === token);
// }

/*
 * Check if token is a deployment token.
 * @param {String} token The authorization token.
 */
export async function isDeploymentRegistryAuth(releaseName, password) {
  // Return false if password is empty.
  if (!password) return false;

  // Return false if releaseName doesn't look right.
  if (releaseName.split("-").length !== 3) return false;

  // Get the registryPassword for this deployment.
  const registryPassword = await prisma
    .deployment({ releaseName })
    .registryPassword();

  // Return false if no result.
  if (!registryPassword) return false;

  // Check the password.
  const valid = await bcrypt.compare(password, registryPassword);

  // Throw error if we don't have a match.
  if (!valid) throw new InvalidCredentialsError();

  // If we make it here, return true.
  return true;
}

/*
 * Send correctly formatted error response back to registry.
 * @param {Object} res The response
 * @param {String} code The error code
 * @param {String} message The error message
 */
export function sendError(res, code, message) {
  return res.status(401).end(
    JSON.stringify({
      errors: [
        {
          code,
          message,
          details: []
        }
      ]
    })
  );
}
