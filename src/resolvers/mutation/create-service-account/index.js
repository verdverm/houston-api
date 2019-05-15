import fragment from "./fragment";
import { checkPermission, serviceAccountRoleMappings } from "rbac";
import { PermissionError } from "errors";
import { compact, includes } from "lodash";
import { addFragmentToInfo } from "graphql-binding";
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

  checkPermission(
    ctx.user,
    `${entityType}.deployments.list`,
    entityType,
    entityUuid
  );

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
