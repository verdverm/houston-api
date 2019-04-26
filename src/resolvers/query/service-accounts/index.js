import fragment from "./fragment";
import { checkPermission, fragments as rbacFragments } from "rbac";
import { MissingArgumentError } from "errors";
import { findKey } from "lodash";
import { addFragmentToInfo } from "graphql-binding";

/*
 * Get a list of service accounts.
 * This resolver has some abnormal behavior since it has to do
 * some extra checks that could not be handled by our auth directive.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {AuthConfig} The auth config.
 */
export default async function serviceAccounts(parent, args, ctx, info) {
  // Pull out some args.
  const { serviceAccountUuid, entityType: upperEntityType, entityUuid } = args;
  const entityType = upperEntityType.toLowerCase();

  // Unfortunately not captured in schema, but throw error if we are missing
  // a required argument.
  if (!(serviceAccountUuid || entityUuid)) {
    throw new MissingArgumentError("serviceAccountUuid or entityUuid");
  }

  // Build query structure.
  const query = { where: {} };

  if (serviceAccountUuid) {
    // Get the SA object, then check permissions on it
    const sa = ctx.db.serviceAccount(
      { where: { id: serviceAccountUuid } },
      rbacFragments.serviceAccount
    );
    const entity = findKey(sa.roleBinding);
    checkPermission(ctx.user, `${entityType}.serviceAccounts.list`, entity);

    query.where = { id: serviceAccountUuid };
  } else {
    const entity = await ctx.db.query[entityType](
      { where: { id: entityUuid } },
      rbacFragments[entityType] //eslint-disable-line import/namespace
    );
    checkPermission(ctx.user, `${entityType}.serviceAccounts.list`, entity);

    query.where = { [entityType]: { id: entityUuid } };
  }

  // Run final query
  const serviceAccounts = await ctx.db.query.serviceAccounts(
    query,
    addFragmentToInfo(info, fragment)
  );

  // If we made it here, return the service accounts.
  return serviceAccounts;
}
