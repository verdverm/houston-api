import { PermissionError } from "errors";
import log from "logger";
import config from "config";
import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";
import jwt from "jsonwebtoken";

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
      // Const permissions = field.permissions || objectType.permissions;

      // Set the context
      const ctx = args[2];

      // Grab token from header, error if not found.
      const auth = ctx.req.get("Authorization") || "";
      const token = auth.replace("Bearer ", "");
      const { uuid: userId } = await this._verify(
        token,
        config.get("jwtPassphrase")
      );

      if (!userId) {
        log.info(`Request missing userId - permission denied`);
        throw new PermissionError();
      }

      ctx.user = await ctx.db.query.user(
        { where: { id: userId } },
        `{ id, username, roleBindings { role, workspace { id }, deployment { id } } }`
      );

      if (!ctx.user) {
        log.info(`UserId ${userId} not found - permission denied`);
        throw new PermissionError();
      }

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
  _verify(token, secret) {
    return new Promise(resolve => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) return resolve({});
        return resolve(decoded);
      });
    });
  }
}
