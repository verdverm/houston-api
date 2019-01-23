import { prisma } from "generated/client";
import log from "logger";
import { InvalidCredentialsError } from "errors";
import { createJWT } from "jwt";
import bcrypt from "bcryptjs";
import config from "config";
import { forEach } from "lodash";

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
  log.info("Handling registry auth");

  const originalUri = req.get("x-original-uri");
  if (!originalUri) {
    sendError(res, REGISTRY_CODES.UNKNOWN, "Unknown registry service request");
  }

  const authorization = req.get("authorization");
  if (!authorization) {
    sendError(
      res,
      REGISTRY_CODES.UNAUTHORIZED,
      "No authorization credentials specified"
    );
  }

  if (!authorization.substr(0, 5) === "Basic") {
    sendError(
      res,
      REGISTRY_CODES.UNAUTHORIZED,
      "Unknown authentication pattern"
    );
  }

  const token = authorization.substr(6);
  const isRegistryAuth = isRegistryAuth(token);

  if (isRegistryAuth) {
    log.info("Do registryAuth stuff here");
  }

  res.json({
    token: createJWT("<<userIdGoesHere>>"),
    expires_in: 3600,
    issued_at: new Date().toISOString()
  });
}

/*
 * Check if token is legit.
 * @param {String} token The authorization token.
 */
export async function isRegistryAuth(token) {
  if (isPlatformRegistryAuth(token)) return true;
  return await isDeploymentRegistryAuth(token);
}

/*
 * Check if token is a platform token.
 * @param {String} token The authorization token.
 */
export function isPlatformRegistryAuth(token) {
  const registryAuth = config.get("registry.auth");
  forEach(registryAuth.auths, value => {
    if (value.auth === token) return true;
  });
}

/*
 * Check if token is a deployment token.
 * @param {String} token The authorization token.
 */
export async function isDeploymentRegistryAuth(token) {
  const decoded = Buffer.from(token, "base64").toString();
  const [releaseName, password] = decoded.split(":");

  // Return false if password is empty.
  if (!password) return false;

  // Return false if releaseName doesn't look right.
  if (releaseName.split("-").length !== 3) return false;

  // Get the registryPassword for this deployment.
  const registryPassword = await prisma
    .deployment({ where: { releaseName } })
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
