import { DuplicateRoleBindingError, InvalidRoleError } from "errors";
import { startsWith } from "lodash";

/*
 * Create a system role binding.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 */
export default async function createSystemRoleBinding(parent, args, ctx, info) {
  // Pull out some args.
  const { userId, role } = args;

  // Throw error if system role not specified.
  if (!startsWith(args.role, "SYSTEM")) throw new InvalidRoleError();

  // Check if the RoleBinding already exists. If so, return it.
  const where = { role, user: { id: userId } };
  const exists = await ctx.db.exists.RoleBinding(where);
  if (exists) throw new DuplicateRoleBindingError();

  // Otherwise, create and return the RoleBinding.
  return ctx.db.mutation.createRoleBinding(
    {
      data: {
        user: { connect: { id: userId } },
        role
      }
    },
    info
  );
}
