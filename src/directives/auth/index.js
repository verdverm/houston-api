import { PermissionError } from "errors";
import log from "logger";
import config from "configuration";
import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";
import jwt from "jsonwebtoken";

export default class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
    type.permissions = this.args.permissions;
  }

  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field.permissions = this.args.permissions;
  }

  ensureFieldsWrapped(objectType) {
    // Ensure we only wrap each field once.
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();
    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      field.resolve = async (...args) => {
        // Const permissions = field.permissions || objectType.permissions;

        // Set the context
        const ctx = args[2];

        // Grab token from header, error if not found.
        const auth = ctx.req.get("Authorization") || "";
        const token = auth.replace("Bearer ", "");
        const { uuid: id } = await this._verify(
          token,
          config.get("jwtPassphrase")
        );

        if (!id) {
          log.info(`Received unauthorized request`);
          throw new PermissionError();
        }

        ctx.user = await ctx.db.query.user(
          { where: { id } },
          `{ id, username, roleBindings { role } }`
        );

        log.info(
          `Processing authenticated request for user ${ctx.user.username}`
        );
        return resolve.apply(this, args);
      };
    });
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
