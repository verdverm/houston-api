import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";

/*
 * This class is used to simply wrap the existing resolver,
 * and populate the UUID field with the existing ID field.
 * This is purely to support the Houston v1 API.
 */
export default class UUIDDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const result = await resolve.apply(this, args);
      return { ...result, uuid: result.id };
    };
  }
}
