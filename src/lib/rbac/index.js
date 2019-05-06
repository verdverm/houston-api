import * as fragments from "./fragments";
import { decodeJWT } from "jwt";
import { PermissionError } from "errors";
import { prisma } from "generated/client";
import { find, includes, size } from "lodash";
import config from "config";
import {
  ENTITY_DEPLOYMENT,
  ENTITY_WORKSPACE,
  DEPLOYMENT_EDITOR,
  WORKSPACE_EDITOR
} from "constants";

export { fragments };

// Mapping of entityTypes to role.
export const serviceAccountRoleMappings = {
  [ENTITY_DEPLOYMENT]: DEPLOYMENT_EDITOR,
  [ENTITY_WORKSPACE]: WORKSPACE_EDITOR
};

/*
 * Check if the user has the given permission for the entity.
 * @param {Object} user The current user.
 * @param {String} permission The required permission.
 */
export function hasPermission(user, permission, entityType, entityId) {
  // If user is falsy, immediately fail.
  if (!user) return false;

  // Check if we're looking for a global permission.
  const systemPermission = permission.startsWith("system");

  // If we're looking for a system permission, return if user has it.
  if (systemPermission) return hasSystemPermission(user, permission);

  if (!entity) return false;
  if (!entity.__typename || !entity.id)
    // This shouldn't happen - this is a logic error!
    throw new Error(
      "Missing id or __typename property on entity to hasPermission"
    );

  const entityType = entity.__typename.toLowerCase();

  const [parentType, parentId] = getParentEntity(entity);

  const roles = config.get("roles");

  // Check if the user has the required permission on the entity, or the
  // permission from the parent entity. For example the WORKSPACE_EDITOR role
  // has "deployment.airflow.user" which grants that permission on all
  // deployments in the workspace.
  return !!find(user.roleBindings, binding => {
    // Since the user might have a role binding to the deployment and workspace
    // we need to check each binding as we find it.
    if (entityType == ENTITY_DEPLOYMENT && binding.workspace) {
      // Check if the asked-for deployment is under this workspace grant
      if (!find(binding.workspace.deployments, _ => _.id == entityId)) {
        return false;
      }
    } else if (!binding[entityType] || binding[entityType].id !== entityId) {
      return false;
    }

    const role = find(roles, { id: binding.role });
    return role && permission in role.permissions;
  });
}

/*
 * Check if the user has a system permission.
 * @param {Object} user The current user.
 * @param {String} user The desired permission.
 * @param {Boolean} If the user has the system permission.
 */
export function hasSystemPermission(user, permission) {
  return !!find(
    user.roleBindings.map(binding => {
      const role = find(config.get("roles"), { id: binding.role });
      return permission in role.permissions;
    })
  );
}

/*
 * Check if the user has the given permission for the entity.
 * Throws if the user does not have permission.
 * @param {Object} user The current user.
 * @param {String} permission The required permission.
 */
export function checkPermission(user, permission, entityType, entityId) {
  if (!hasPermission(user, permission, entityType, entityId)) {
    throw new PermissionError();
  }
}

/* Get a user that has the required information to make
 * RBAC decisions.
 * @param {String} id The user id.
 * @return {Promise<Object>} The User object with RoleBindings.
 */
export function getUserWithRoleBindings(id) {
  return prisma.user({ id }).$fragment(fragments.user);
}

/* Get a ServiceAccount that has the required information to make
 * RBAC decisions.
 * @param {String} apiKey The apiKey.
 * @return {Object} The ServiceAccount object with RoleBindings.
 */
export async function getServiceAccountWithRoleBindings(apiKey) {
  // Get the Service Account by API Key.
  const serviceAccount = await prisma
    .serviceAccount({ apiKey })
    .$fragment(fragments.serviceAccount);

  // Return early if we didn't find a service account.
  if (!serviceAccount) return;

  // Return a slightly modified version, to mimic what we return
  // for a user.
  return {
    id: serviceAccount.id,
    roleBindings: [serviceAccount.roleBinding]
  };
}

/*
 * Check if the authorization header looks like a service account.
 * @param {String} authorization An authorization header.
 * @return {Boolean} If the header looks like a service account
 */
export function isServiceAccount(authorization) {
  return size(authorization) === 32 && !includes(authorization, ".");
}

/*
 * Get either a user or a Service Account from an Authorization header.
 * @param {String} authorization An authorization header.
 * @return {Object} The authed user or Service Account.
 */
export async function getAuthUser(authorization) {
  // Return early if empty.
  if (!authorization) return;

  // Check if the header is a service account.
  const isServiceAcct = isServiceAccount(authorization);

  // If we do have a service account, set it as the user on the context.
  if (isServiceAcct) {
    return await getServiceAccountWithRoleBindings(authorization);
  }

  // Decode the JWT.
  const { uuid } = await decodeJWT(authorization);

  // If we have a userId, set the user on the session,
  // otherwise return nothing.
  if (uuid) return await getUserWithRoleBindings(uuid);
}
