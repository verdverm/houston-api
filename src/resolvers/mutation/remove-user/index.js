/*
 * Remove a user from platform
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 */
export default async function removeUser(parent, args, ctx) {
  // Pull out some args
  const { userUuid } = args;

  // Remove the User
  const where = { id: userUuid };
  return ctx.db.mutation.deleteUser({ where });
}
