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
