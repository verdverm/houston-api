import fragment from "./fragment";
import { addFragmentToInfo } from "graphql-binding";
import { WORKSPACE_ADMIN } from "constants";

/*
 * Create a new workspace.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {AuthToken} The workspace.
 */
export default async function createWorkspace(parent, args, ctx, info) {
  return ctx.db.mutation.createWorkspace(
    {
      data: {
        active: true,
        label: args.label,
        description: args.description,
        roleBindings: {
          create: {
            role: WORKSPACE_ADMIN,
            user: {
              connect: {
                id: ctx.user.id
              }
            }
          }
        }
      }
    },
    addFragmentToInfo(info, fragment)
  );
}
