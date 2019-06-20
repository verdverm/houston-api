import fragment from "./fragment";
import { hasPermission } from "rbac";
import config from "config";
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
  // Check to see if user has permission to view and update billing
  const billingAllowed = hasPermission(
    ctx.user,
    "workspace.billing.update",
    ENTITY_WORKSPACE.toLowerCase(),
    parent.id
  );
  // Get stripeEnabled bool directly from config
  const stripeEnabled = config.get("stripe.enabled");
  // Return the flag that will tell us whether or not we should show Billing in the UI
  const canUpdateBilling = billingAllowed && stripeEnabled;

  const canUpdateIAM = hasPermission(
    ctx.user,
    "workspace.iam.update",
    ENTITY_WORKSPACE.toLowerCase(),
    parent.id
  );

  const { endDate } = ctx.db.query.workspace(
    { where: { id: args.workspaceUuid } },
    `{ trialEndsAt }`
  );

  const isTrialing = Date.now() < endDate ? true : false;

  return { canUpdateIAM, canUpdateBilling, isTrialing };
}

export default {
  users,
  groups,
  invites,
  deploymentCount,
  workspaceCapabilities
};
