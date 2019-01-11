import { serviceAccountRoleMappings } from "rbac";
import { addFragmentToInfo } from "graphql-binding";
import crypto from "crypto";

/*
 * Create a service account.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {AuthConfig} The auth config.
 */
export default async function createServiceAccount(parent, args, ctx, info) {
  // Pull out some variables.
  const { label, category, entityType, entityUuid } = args;

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

  // Create a fragment to ensure that we always return the id.
  const fragment = `fragment EnsureFields on ServiceAccount { id, roleBinding { role, workspace { id } }, deployment { id } }`;

  // Run the mutation.
  return ctx.db.mutation.createServiceAccount(
    mutation,
    addFragmentToInfo(info, fragment)
  );
}
