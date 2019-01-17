import fragment from "./fragment";
import { PermissionError } from "errors";
import log from "logger";
import config from "config";
import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";
import jwt from "jsonwebtoken";
import { find, includes } from "lodash";
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
      // Set the context
      const ctx = args[2];

      // Grab token from header, error if not found.
      const auth = ctx.req.get("Authorization") || "";
      const token = auth.replace("Bearer ", "");
      const passphrase = config.get("jwtPassphrase");

      // Throw error if there is no token.
      const { uuid: userId } = await this.verify(token, passphrase);
      if (!userId) throw new PermissionError();

      // Throw error if we can't find the user.
      ctx.user = await ctx.db.query.user({ where: { id: userId } }, fragment);
      if (!ctx.user) throw new PermissionError();

      // Pull out some vars for checking permissions.
      const { workspaceUuid, deploymentUuid } = args[1];
      const { permission } = this.args;

      // If we have a permission and a workspace, ensure we have an appropriate role.
      permission &&
        workspaceUuid &&
        this.checkPermission(
          ctx.user,
          permission,
          ENTITY_WORKSPACE.toLowerCase()
        );

      // If we have a permission and a deployment, ensure we have an appropriate role.
      permission &&
        deploymentUuid &&
        this.checkPermission(
          ctx.user,
          permission,
          ENTITY_DEPLOYMENT.toLowerCase()
        );

      // Execute the actual request.
      log.debug(`Executing authenticated request for userId ${userId}`);
      return resolve.apply(this, args);
    };
  }

  /*
   * Verify JWT, returning empty object if not valid.
   * @param {String} token The user token
   * @param {String} secret The secret used to sign the JWTs
   * @return {Object} The decoded JWT
   */
  verify(token, secret) {
    return new Promise(resolve => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) return resolve({});
        return resolve(decoded);
      });
    });
  }

  /*
   * Check if the user has the given permission for the entity.
   * @param {Object} user The current user.
   * @param {String} permission The required permission.
   */
  checkPermission(user, permission, entityType) {
    const binding = find(user.roleBindings, binding =>
      binding[entityType] ? binding[entityType].id : null
    );
    const role = find(config.get("roles"), { id: binding.role });
    if (!includes(role.permissions, permission)) {
      throw new PermissionError();
    }
  }
}
