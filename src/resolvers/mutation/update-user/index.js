import { combinePropsForUpdate, propertiesObjectToArray } from "utilities";

/*
 * Update a User.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {User} The updated User.
 */
export default async function updateUser(parent, args, ctx, info) {
  const currentProps = await ctx.db.query.userProperties({
    where: { user: { id: ctx.user.id } }
  });

  const combinedProps = combinePropsForUpdate(
    currentProps,
    propertiesObjectToArray(args.payload)
  );

  const where = { id: ctx.user.id };
  const data = { profile: combinedProps };
  return ctx.db.mutation.updateUser({ where, data }, info);
}
