import { PermissionError } from "errors";
import log from "logger";
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
      const { workspaceUuid, deploymentUuid } = args[1];
      const { permission } = this.args;

      // If we have a permission and a workspace, ensure we have an appropriate role.
      permission &&
        workspaceUuid &&
        checkPermission(
          ctx.user,
          permission,
          ENTITY_WORKSPACE.toLowerCase(),
          workspaceUuid
        );

      // If we have a permission and a deployment, ensure we have an appropriate role.
      permission &&
        deploymentUuid &&
        checkPermission(
          ctx.user,
          permission,
          ENTITY_DEPLOYMENT.toLowerCase(),
          deploymentUuid
        );

      // Execute the actual request.
      log.debug(
        `Executing authenticated graphql request for userId ${ctx.user.id}`
      );
      return resolve.apply(this, args);
    };
  }
}
