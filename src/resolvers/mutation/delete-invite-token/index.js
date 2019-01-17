/*
 * Delete an invite token.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {Invite} The deleted Invite.
 */
export default function deleteInviteToken(parent, args, ctx) {
  // Delete the record from the database.
  return ctx.db.mutation.deleteInviteToken(
    {
      where: { id: args.inviteUuid }
    },
    `{ id }`
  );
}
