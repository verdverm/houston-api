import { userFragment } from "./fragment";
import { addFragmentToInfo } from "graphql-binding";
/*
 * Get list of users.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return users on this specific workspace
 */
export default async function workspaceUsers(parent, args, ctx, info) {
  // Build the users query.
  const query = invitesQuery(args);

  return ctx.db.query.users(
    {
      where: {
        roleBindings_some: {
          workspace: { id: args.workspaceUuid }
        },
        ...query
      }
    },
    addFragmentToInfo(info, userFragment)
  );
}

/*
 * Build the workspaceUsers query based on args.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {Object} The users query.
 */
export function invitesQuery(args) {
  // Pull out some args.
  const { email } = args;

  // If we have an email use it.
  if (email) return { username_contains: email.toLowerCase() };

  return null;
}
