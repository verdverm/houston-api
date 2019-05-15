import { checkPermission } from "rbac";
import { pick } from "lodash";

/*
 * Update a Service Account.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {ServiceAccount} The updated ServiceAccount.
 */
export default function updateServiceAccount(parent, args, ctx, info) {
  // Extract entity information.
  const { entityType: upperEntityType, entityId } = args.payload;
  const entityType = upperEntityType.toLowerCase();

  // Make sure we have permission to do this.
  checkPermission(
    ctx.user,
    `${entityType}.serviceAccounts.update`,
    entityType,
    entityId
  );

  // The external facing schema is too loose as JSON.
  // For now, we just pluck out any props that are not in this list.
  const data = pick(args.payload, ["category", "label"]);
  const where = { id: args.serviceAccountUuid };
  return ctx.db.mutation.updateServiceAccount({ where, data }, info);
}
