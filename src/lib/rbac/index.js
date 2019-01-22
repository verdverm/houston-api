import { PermissionError } from "errors";
import { find, includes } from "lodash";
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
  const binding = find(user.roleBindings, binding => {
    const globalPermission = permission.startsWith("global");
    const hasEntity = binding[entityType];
    const idMatch = hasEntity && binding[entityType].id === entityId;

    // Return true if we're looking for a global permission
    // and there's no entity attached to this binding.
    if (globalPermission && !hasEntity) return true;

    // Return true if we're looking for a scoped permission,
    // and this binding has the entity type we're interested
    // in and the id matches.
    if (!globalPermission && idMatch) return true;
  });

  const role = find(config.get("roles"), { id: binding.role });
  return includes(role.permissions, permission);
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
