import { serviceAccountRoleMappings } from "rbac";
import { get, invert } from "lodash";

export function entityUuid(parent) {
  return (
    get(parent, "roleBinding.workspace.id") ||
    get(parent, "roleBinding.deployment.id")
  );
}

export function entityType(parent) {
  const role = get(parent, "roleBinding.role");
  return invert(serviceAccountRoleMappings)[role];
}

export default { entityUuid, entityType };
