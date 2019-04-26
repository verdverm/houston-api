import fragment from "./fragment";
import {
  serviceAccountRoleMappings,
  checkPermission,
  fragments as rbacFragments
} from "rbac";
import { addFragmentToInfo } from "graphql-binding";
import { UserInputError } from "apollo-server";
import { ENTITY_DEPLOYMENT, ENTITY_WORKSPACE } from "constants";
import crypto from "crypto";

/*
 * Create a service account.
 * This resolver has some abnormal behavior since it has to do
 * some extra checks that could not be handled by our auth directive.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {AuthConfig} The auth config.
 */
export default async function createServiceAccount(parent, args, ctx, info) {
  // Pull out some variables.
  const { label, category, entityType: upperEntityType, entityUuid } = args;
  const entityType = upperEntityType.toLowerCase();

  let entity;
  switch (upperEntityType) {
    case ENTITY_DEPLOYMENT:
      entity = await ctx.db.query.deployment(
        { where: { id: entityUuid } },
        rbacFragments.deployment
      );
      checkPermission(ctx.user, "deployment.serviceAccounts.create", entity);
      break;
    case ENTITY_WORKSPACE:
      entity = await ctx.db.query.workspace(
        { where: { id: entityUuid } },
        rbacFragments.workspace
      );
      checkPermission(ctx.user, "workspace.serviceAccounts.create", entity);
      break;
    default:
      throw new UserInputError(`Unsupported entityType "${upperEntityType}"`);
  }

  // Create the base mutation.
  const mutation = {
    data: {
      label,
      category,
      apiKey: crypto.randomBytes(16).toString("hex"),
      active: true,
      roleBinding: {
        create: {
          role: serviceAccountRoleMappings[upperEntityType],
          [entityType]: {
            connect: { id: entityUuid }
          }
        }
      }
    }
  };

  // Run the mutation.
  return ctx.db.mutation.createServiceAccount(
    mutation,
    addFragmentToInfo(info, fragment)
  );
}
