/*
 * Get a list of invites for a workpace.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {[]Invites} A list of invites.
 */
export default async function invites(parent, args, ctx) {
  let { workspaceUuid, email } = args;
  email = email.toLowerCase();

  return ctx.db.query.inviteTokens({
    where: { workspace: { id: workspaceUuid }, email }
  });
}
