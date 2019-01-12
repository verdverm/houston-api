import fragment from "./fragment";
import { serviceAccountRoleMappings } from "rbac";
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

  // Get a list of ids of entityType that this user has access to.
  const ids = compact(
    ctx.user.roleBindings.map(binding =>
      binding[entityType] ? binding[entityType].id : null
    )
  );

  // Throw error if the incoming entityId is not in the list of ids for this user.
  if (!includes(ids, entityUuid)) {
    throw new PermissionError();
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
          role: serviceAccountRoleMappings[entityType],
          [entityType.toLowerCase()]: {
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
