import fragment from "./fragment";
import { PermissionError } from "errors";
import { prisma } from "generated/client";
import { filter, find, flatten, includes } from "lodash";
import config from "config";
import {
  ENTITY_DEPLOYMENT,
  ENTITY_WORKSPACE,
  DEPLOYMENT_EDITOR,
  WORKSPACE_EDITOR
} from "constants";

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
  // Check if we're looking for a global permission.
  const globalPermission = permission.startsWith("global");

  // If we're looking for a global permission, return if user has it.
  if (globalPermission) return hasGlobalPermission(user, permission);

  // If we don't have both of these, return false from here.
  if (!entityType || !entityId) return false;

  // Otherwise we have to ensure the user has access to the entity.
  const binding = find(user.roleBindings, binding => {
    // Return true if we're looking for a scoped permission,
    // and this binding has the entity type we're interested
    // in and the id matches.
    const hasEntity = !!binding[entityType];
    return hasEntity && binding[entityType].id === entityId;
  });

  // If we didn't find a roleBinding, return false.
  if (!binding) return false;

  // Otherwise return if this role has an appropriate permission.
  const role = find(config.get("roles"), { id: binding.role });
  return includes(role.permissions, permission);
}

/*
 * Check if the user has a global permission.
 * @param {Object} user The current user.
 * @param {String} user The desired permission.
 * @param {Boolean} If the user has the global permission.
 */
export function hasGlobalPermission(user, permission) {
  const permissions = flatten(
    user.roleBindings.map(binding => {
      const role = find(config.get("roles"), { id: binding.role });
      return filter(role.permissions, p => p.startsWith("global"));
    })
  );

  return includes(permissions, permission);
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
 * @return {Promise<Object>} The user object with RoleBindings.
 */
export function getUserWithRoleBindings(id) {
  return prisma.user({ id }).$fragment(fragment);
}

/* If the passed argument is a string, lookup the user by id.
 * Otherwise use the user.id to get the user, with RoleBindings.
 * @param {String|Object} user The user object or id.
 * @return {Promise<Object} The user object with RoleBindings.
 */
// export function ensureUserRoleBindings(user) {
//   if (isString(user)) return getUserWithRoleBindings(user);
//   return getUserWithRoleBindings(user.id);
// }
