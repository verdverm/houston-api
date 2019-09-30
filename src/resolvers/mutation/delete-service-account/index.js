import { hasPermission } from "rbac";
import { PermissionError, ResourceNotFoundError } from "errors";
import { compact, findKey, includes } from "lodash";

/*
 * Delete a service account.
 * This resolver has some abnormal behavior since it has to do
 * some extra checks that could not be handled by our auth directive.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {Invite} The deleted Invite.
 */
export default async function deleteServiceAccount(parent, args, ctx) {
  // Pull out some variables.
  const { serviceAccountUuid } = args;

  // Look for the service account first.
  const serviceAccount = await ctx.db.query.serviceAccount(
    {
      where: { id: serviceAccountUuid }
    },
    `{ roleBinding { workspace { id }, deployment { id } } }`
  );

  // Throw if it doesn't exist.
  if (!serviceAccount) throw new ResourceNotFoundError();

  // Determine the entityType by looking at the roleBinding.
  const entityType = findKey(serviceAccount.roleBinding);

  // Check if we have system-level access.
  const hasSystemPerm = hasPermission(
    ctx.user,
    "system.serviceAccounts.delete"
  );

  // Get a list of ids of entityType that this user has access to.
  const ids = compact(
    ctx.user.roleBindings.map(binding =>
      binding[entityType] ? binding[entityType].id : null
    )
  );

  // Throw error if the incoming entityId is not in the list of ids for this user.
  if (
    !hasSystemPerm &&
    !includes(ids, serviceAccount.roleBinding[entityType].id)
  ) {
    throw new PermissionError();
  }

  // Delete the record from the database.
  return ctx.db.mutation.deleteServiceAccount(
    {
      where: { id: serviceAccountUuid }
    },
    `{ id }`
  );
}
