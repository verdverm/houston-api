import { PermissionError } from "errors";
import { checkPermission } from "rbac";
import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";
import { ENTITY_WORKSPACE, ENTITY_DEPLOYMENT } from "constants";

/*
 * Directive to enforce authentication and authorization
 * Originally derived from https://www.apollographql.com/docs/graphql-tools/schema-directives.html#Enforcing-access-permissions
 */
export default class AuthDirective extends SchemaDirectiveVisitor {
  visitObject() {}

  visitFieldDefinition(field) {
    this.ensureFieldWrapped(field);
  }

  ensureFieldWrapped(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async (...args) => {
      // Set the context.
      const ctx = args[2];

      // Map the session user down to graphql context
      // for ease of acess in downstream resolvers.
      ctx.user = ctx.req.session.user;

      // Throw error if there is no token.
      if (!ctx.user) throw new PermissionError();

      // Pull out some vars for checking permissions.
      const { permission } = this.args;

      // If this instance of the directive is specifying a permission,
      // check it. Otherwise, skip this part.
      if (permission) {
        // Check for standard scope defining variables.
        const { workspaceUuid, deploymentUuid } = args[1];

        // Determine the entityType from args.
        const entityType = workspaceUuid
          ? ENTITY_WORKSPACE.toLowerCase()
          : deploymentUuid
          ? ENTITY_DEPLOYMENT.toLowerCase()
          : null;

        // Determine the entityId from args.
        const entityId = workspaceUuid
          ? workspaceUuid
          : deploymentUuid
          ? deploymentUuid
          : null;

        // Check permission, throw if not authorized.
        checkPermission(ctx.user, permission, entityType, entityId);
      }

      // Execute the actual request.
      return resolve.apply(this, args);
    };
  }
}
