import fragment from "./fragment";
import { hasPermission } from "rbac";
import { addFragmentToInfo } from "graphql-binding";
import { size } from "lodash";

import { ENTITY_WORKSPACE } from "constants";

export function users(parent, args, ctx, info) {
  return ctx.db.query.users(
    {
      where: {
        roleBindings_some: {
          workspace: { id: parent.id }
        }
      }
    },
    info ? addFragmentToInfo(info, fragment) : info
  );
}

export function groups() {
  return [];
}

export function invites(parent, args, ctx) {
  return ctx.db.query.inviteTokens({
    where: { workspace: { id: parent.id } }
  });
}

export function deploymentCount(parent) {
  return size(parent.deployments);
}

export function workspaceCapabilities(parent, args, ctx) {
  const updateIAM = hasPermission(
    ctx.user,
    "workspace.iam.update",
    ENTITY_WORKSPACE.toLowerCase(),
    parent.id
  );

  return { updateIAM };
}

export default {
  users,
  groups,
  invites,
  deploymentCount,
  workspaceCapabilities
};
