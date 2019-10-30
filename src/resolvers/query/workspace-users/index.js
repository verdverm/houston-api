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
  const query = usersQuery(args);

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
export function usersQuery(args) {
  // Pull out some args.
  const { fullName, email } = args;

  // If we have username, use it.
  if (fullName) return { fullName_contains: fullName };

  // If we have an email use it.
  if (email) return { emails_some: { address: email.toLowerCase() } };

  return null;
}
