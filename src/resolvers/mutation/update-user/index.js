/*
 * Update a User.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {User} The updated User.
 */
export default async function updateUser(parent, args, ctx, info) {
  const user = await ctx.db.mutation.updateUser({}, info);
  return user;
}
