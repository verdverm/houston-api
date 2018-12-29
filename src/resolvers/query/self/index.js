/*
 * Get information about the logged in user.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {AuthConfig} The auth config.
 */
export default async function self(parent, args, ctx) {
  return { userId: ctx.user.id };
}
