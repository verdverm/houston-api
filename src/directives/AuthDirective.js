import { PermissionError } from "./errors";
import log from "logger";
import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";
import config from "config";
import jwt from "jsonwebtoken";

export const APP_SECRET = "BLAHHHH";

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
        const permissions = field.permissions || objectType.permissions;

        // Set the context
        const ctx = args[2];

        // Grab token from header, error if not found.
        const auth = ctx.req.get("Authorization") || "";
        const token = auth.replace("Bearer ", "");
        const { uuid: id } = await this._verify(
          token,
          config.get("jwtPassphrase")
        );
        if (!id) throw new PermissionError();

        ctx.user = await ctx.db.query.user(
          { where: { id } },
          `{ id, roleBindings { role }}`
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
