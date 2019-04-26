import { checkPermission, fragments as rbacFragments } from "rbac";
import { ResourceNotFoundError } from "errors";
import { findKey } from "lodash";

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
    rbacFragments.serviceAccount
  );

  // Throw if it doesn't exist.
  if (!serviceAccount) throw new ResourceNotFoundError();

  // Determine the entityType by looking at the roleBinding.
  const entityType = findKey(serviceAccount.roleBinding);

  checkPermission(
    ctx.user,
    `${entityType}.serviceAccounts.delete`,
    serviceAccount.roleBinding[entityType]
  );

  // Delete the record from the database.
  return ctx.db.mutation.deleteServiceAccount(
    {
      where: { id: serviceAccountUuid }
    },
    `{ id }`
  );
}
